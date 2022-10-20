import getStripe from "../utils/get-stripe";

export default async function stripeCheckout(){
    const res= await fetch(
      
        '/api/checkout_sessions',{
          method: "POST",
        },    
        { amount: 1000 },
      );
        const checkoutSession=await res.json()
    
      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message);
        return;
      }
    
      // Redirect to Checkout.
    //   console.log(checkoutSession.id)
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
       
        sessionId: checkoutSession.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
      return stripe
}