const Razorpay=require("razorpay")

const { v4: uuidv4 } = require("uuid");

const instance = new Razorpay({
  key_id: "rzp_test_jbzjfbGd3TBj4tY",
  key_secret: "rD4swQl6G1HZUJFmUkgV4ImD",
});

  export async function handler(params, request) {

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
      return new Response(JSON.stringify({ id: response.id,
        currency: response.currency,
        amount: response.amount,}), {
        status: 200,
       
      })
    } catch (error) {
      console.log(error);
    }

   console.log("dheera")
   
  }
