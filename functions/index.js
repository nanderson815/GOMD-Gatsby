const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.token);
const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (request.method !== 'POST') {
            return
        }
        console.log(request.body)
        response.send("Hello from Georgia on my dime!")
    });
});

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
