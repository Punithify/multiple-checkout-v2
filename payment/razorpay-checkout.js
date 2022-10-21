
export const displayRazorpay=async ()=>{
    const res=await fetch("/api/razorpay_session");
    const order=await res.json()
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 400000,
      currency: order.currency,
      name: "St Joseph's College",
      description: " 2021",
      order_id: order.id,
      image: "",
      handler: function (response) {
        alert("success")
      },
      "modal": {
        "ondismiss": function(){
            return false
        }
    },
      prefill: {
        name: "",
        email: "",
        contact: "",
        college:""
      },
     
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    
    paymentObject.open();
}