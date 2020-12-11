const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const stripe = require('stripe')(functions.config().stripe.token)
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors')({ origin: true })
const contentful = require('contentful')

const spaceId = functions.config().contentful.spaceid
const contentfulToken = functions.config().contentful.token

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
    const email = request.body.email.toLowerCase()
    const { name } = request.body
    const { uid } = request.body
    const db = admin.firestore()
    stripe.customers.list({ email }, (err, customers) => {
      if (customers.data.length > 0) {
        response.send(customers.data[0])
      } else if (err) {
        response.send(err)
      } else {
        stripe.customers.create(
          {
            email,
            name
          },
          (err, customer) => {
            if (err) {
              console.log(err)
              response.send(err)
            } else {
              const { id } = customer
              db.collection('users')
                .doc(uid)
                .set({ stripeId: id })
                .then(() => {
                  response.send(customer)
                })
                .catch(err => console.log(err))
            }
          }
        )
      }
    })
  })
})

// This function creates a voucher in the DB after a product is created in stripe. Need this to track quantity.
exports.createProductFromSku = functions.https.onRequest(async (request, response) => {
  cors(request, response, () => {
    if (request.method !== 'POST') {
      return
    }
    const obj = request.body.data.object
    const slug = obj.metadata.contentfulSlug

    const client = contentful.createClient({
      space: spaceId,
      accessToken: contentfulToken
    })
    client
      .getEntries({
        content_type: 'happyHour',
        'fields.slug': slug
      })
      .then(res => {
        const content = res.items[0].fields
        const voucher = {
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
          quantity: parseInt(obj.metadata.quantity, 10)
        }
        admin
          .firestore()
          .collection('vouchers')
          .doc(obj.id)
          .set(voucher, { merge: true })
          .then(() => response.json({ recieved: true }))
          .catch(error => response.json({ recieved: false, error }))
      })
      .catch(console.error)
  })
})

// Call this in the funciton above.
const createStripeCheckout = (request, response, id) => {
  const data = {
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
        quantity: 1
      }
    ]
  }
  if (id) {
    data.customer = id
  }
  stripe.checkout.sessions.create(data, (err, session) => {
    if (err) {
      response.send(err)
    } else {
      response.send(session)
    }
  })
}

// Creates a checkout session.
exports.createCheckoutSession = functions.https.onRequest(async (request, response) => {
  cors(request, response, () => {
    if (request.method !== 'POST') {
      return
    }
    if (request.body.metadata.vouchersSold >= request.body.metadata.quantity) {
      return
    }
    const email = request.body.metadata.user_email
    stripe.customers.list({ email }, (err, customers) => {
      if (customers.data.length > 0) {
        const customerId = customers.data[0].id
        createStripeCheckout(request, response, customerId)
      } else if (err) {
        response.send(err)
      } else {
        createStripeCheckout(request, response)
      }
    })
  })
})

// Adds voucher to user profile after checkout is complete.
exports.postCheckoutProcess = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== 'POST') {
      return
    }
    // This is where the coupon voucher will be created and added to firebase DB for user.
    const data = request.body.data.object
    const { voucherId } = data.metadata
    const userVoucherId = data.id
    const document = {
      id: userVoucherId,
      price: data.display_items[0].amount,
      descriptionFull: data.display_items[0].custom.description,
      address: data.metadata.address,
      duration: data.metadata.duration,
      name: data.display_items[0].custom.name,
      images: data.display_items[0].custom.images,
      description: data.metadata.caption,
      redeemed: false,
      couponCode: data.metadata.couponCode,
      slug: data.metadata.slug,
      purchaseDate: new Date()
    }
    admin
      .firestore()
      .collection('vouchers')
      .doc(voucherId)
      .update({ vouchersSold: admin.firestore.FieldValue.increment(1) })
    admin
      .firestore()
      .collection('users')
      .doc(data.metadata.user_id)
      .collection('vouchers')
      .doc(userVoucherId)
      .set(document)
      .then(() => response.json({ recieved: true }))
      .catch(error => response.json({ recieved: false, error }))
  })
})

// Marks voucher as used.
exports.redeemVoucher = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.method !== 'POST') {
      return
    }
    const { uid } = request.body
    const { voucherId } = request.body
    admin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('vouchers')
      .doc(voucherId)
      .update({ redeemed: true })
      .then(res => {
        response.json({ response: res, uid: voucherId })
      })
      .catch(error => response.json(error))
  })
})
