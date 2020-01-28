const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.token);
const cors = require('cors')({ origin: true });

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

exports.createCheckoutSession = functions.https.onRequest(async (request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        stripe.checkout.sessions.create(
            {
                success_url: request.body.successUrl,
                cancel_url: request.body.cancelUrl,
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

exports.postCheckoutProcess = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        // This is where the coupon voucher will be created and added to firebase DB for user.
        let data = request.body.data.object
        let voucherId = data.id
        let document = {
            id: voucherId,
            name: data.display_items[0].custom.name,
            images: data.display_items[0].custom.images,
            description: data.metadata.caption,
            redeemed: false,
            couponCode: data.metadata.couponCode
        }
        admin.firestore().collection('users').doc(data.metadata.user_id).collection('vouchers').doc(voucherId).set({ document })
            .then(() => response.json({ recieved: true }))
            .catch((error) => response.json({ recieved: false, error: error }))
    })
})
