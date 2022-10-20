


export const displayRazorpay=async ()=>{
    const res=await fetch("/api/razorpay_session");
    const order=await res.json()
    console.log(order)
    const options = {
      key: "rzp_test_y3CxNF2TYTvNTZ",
      amount: 400000,
      currency: order.currency,
      name: "St Joseph's College",
      description: " 2021",
      order_id: order.id,
      image: "",
      handler: function (response) {
        alert("success")
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