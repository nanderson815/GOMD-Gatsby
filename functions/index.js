const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.token);
const cors = require('cors')({ origin: true });
const contentful = require('contentful')
const spaceId = functions.config().contentful.spaceid;
const contentfulToken = functions.config().contentful.token;

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         if (request.method !== 'POST') {
//             return
//         }
//         console.log(request.body)
//         response.send("Hello from Georgia on my dime!")
//     });
// });

exports.createCustomer = functions.https.onRequest(async (request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        let email = request.body.email
        let name = request.body.name
        let uid = request.body.uid
        let db = admin.firestore()
        stripe.customers.list(
            { email: email },
            function (err, customers) {
                console.log(customers)
                if (customers.data.length > 0) {
                    response.send(customers.data[0])
                } else if (err) {
                    response.send(err)
                } else {
                    stripe.customers.create(
                        {
                            email: email,
                            name: name
                        },
                        function (err, customer) {
                            if (err) {
                                console.log(err)
                                response.send(err)
                            } else {
                                console.log(customer.id)
                                let id = customer.id
                                db.collection("users").doc(uid).set({ stripeId: id })
                                    .then(() => console.log("done"))
                                    .catch(err => console.log(err))
                                response.send(customer)
                            }
                        }
                    );
                }
            }
        );
    })
})

// This function creates a voucher in the DB after a product is created in stripe. Need this to track quantity. 
exports.createProductFromSku = functions.https.onRequest(async (request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        let obj = request.body.data.object
        let slug = obj.metadata.contentfulSlug;

        const client = contentful.createClient({
            space: spaceId,
            accessToken: contentfulToken
        })
        client.getEntries({
            content_type: 'happyHour',
            'fields.slug': slug
        })
            .then((res) => {
                console.log(res.items[0])
                let content = res.items[0].fields
                let voucher = {
                    name: obj.name,
                    id: obj.id,
                    attributes: obj.attributes,
                    price: obj.metadata.price,
                    basePrice: obj.metadata.basePrice,
                    couponCode: obj.metadata.couponCode,
                    slug: obj.metadata.slug,
                    caption: obj.caption,
                    description: obj.description,
                    image: content.mainImg.fields,
                    neighborhood: content.neighborhood,
                    address: content.address,
                    quantity: parseInt(obj.metadata.quantity)
                }
                admin.firestore().collection('vouchers').doc(obj.id).set(voucher, { merge: true })
                    .then(() => response.json({ recieved: true }))
                    .catch((error) => response.json({ recieved: false, error: error }))
            })
            .catch(console.error)
    });
})

// Creates a checkout session.
exports.createCheckoutSession = functions.https.onRequest(async (request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        } else if (request.body.metadata.vouchersSold >= request.body.metadata.quantity) {
            return
        }
        stripe.checkout.sessions.create(
            {
                success_url: request.body.successUrl,
                cancel_url: request.body.cancelUrl,
                customer: request.body.stripeId,
                // customer_email: request.body.metadata.user_email,
                payment_method_types: ['card'],
                metadata: request.body.metadata,
                line_items: [
                    {
                        name: request.body.name,
                        description: request.body.description,
                        images: request.body.image,
                        amount: request.body.price,
                        currency: 'usd',
                        quantity: 1,
                    },
                ],
            },
            function (err, session) {
                if (err) {
                    response.send(err)
                } else {
                    response.send(session)
                }
            }
        );
    })
})

// Adds voucher to user profile after checkout is complete.
exports.postCheckoutProcess = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        // This is where the coupon voucher will be created and added to firebase DB for user.
        let data = request.body.data.object
        let voucherId = data.metadata.voucherId
        let userVoucherId = data.id
        let document = {
            id: userVoucherId,
            price: data.display_items[0].amount,
            descriptionFull: data.display_items[0].custom.description,
            address: data.metadata.address,
            name: data.display_items[0].custom.name,
            images: data.display_items[0].custom.images,
            description: data.metadata.caption,
            redeemed: false,
            couponCode: data.metadata.couponCode,
            slug: data.metadata.slug,
            purchaseDate: new Date()
        }
        admin.firestore().collection('vouchers').doc(voucherId).update({ vouchersSold: admin.firestore.FieldValue.increment(1) })
        admin.firestore().collection('users').doc(data.metadata.user_id).collection('vouchers').doc(userVoucherId).set(document)
            .then(() => response.json({ recieved: true }))
            .catch((error) => response.json({ recieved: false, error: error }))
    })
})

// Marks voucher as used.
exports.redeemVoucher = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        let uid = request.body.uid;
        let voucherId = request.body.voucherId
        admin.firestore().collection("users").doc(uid).collection('vouchers').doc(voucherId).update({ redeemed: true })
            .then((res) => {
                response.json({ response: res, uid: voucherId })
            })
            .catch((error) => response.json(error))

    })
})
