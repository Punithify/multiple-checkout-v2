const Razorpay=require("razorpay")

const { v4: uuidv4 } = require("uuid");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {

    const payment_capture = 1;
    const options = {
      amount: 40 * 100,
      currency: "INR",
      receipt: `syn-${uuidv4()}`,
      payment_capture,
      notes: { events: "" },
    };
    try {
      const response = await instance.orders.create(options);
     console.log(response)
      res.json({ id: response.id,
        currency: response.currency,
        amount: response.amount,})
    } catch (error) {
      console.log(error);
    }

   console.log("dheera")
   
  }
