import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
  });

export  default async function handler(req, res) {
    const params= {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Custom amount donation',
            amount: 2000,
            currency: "INR",
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      };
      const checkoutSession=
        await stripe.checkout.sessions.create(params);
        console.log(checkoutSession)
    res.json(checkoutSession)
  }
  