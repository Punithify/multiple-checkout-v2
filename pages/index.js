import {Container,Text ,Radio,Button} from '@nextui-org/react'
import {useState,useEffect} from "react"
import stripeCheckout from '../payment/stripe-checkout';

export default function Home({country}) {
 
  const [disabled,setDisabled]=useState({razorpay:true,stripe:false})
  country = decodeURIComponent(country);
  

  const loadStripe= ()=>{
    stripeCheckout()
  }

  const loadRazorpay=()=>{
    console.log("razorpay")
  }


  const loadPayment=()=>{
    return disabled.razorpay?loadStripe():loadRazorpay()
  }

  // useEffect(() => {
  //   if (country === "IN") {
  //     setDisabled({razorpay:false,stripe:true});
  //     return;
  //   } 
  // }, [country]);



  return (
    <>
    <Container
    display="flex"
    justify="center"
    alignItems="center"
    >
    <Text
    
    h1
    size={60}
    css={{
      textGradient: "45deg, $blue600 -20%, $pink600 50%",
    }}
    weight="bold"
  >
    Multiple Payment Checkout
  </Text>

    </Container>
    <Container >
      <Text h4>Payment</Text>
  <Text h5>All transactions are secure and encrypted.</Text>
  <Radio.Group orientation="vertical"
   label="payment"
   defaultValue={disabled.stripe?"razorpay" :"stripe"}
  >
      <Radio 
      value="razorpay"
      
      isDisabled={disabled.razorpay}
       >
      Netbanking/UPI (Processed via Razorpay)
      </Radio>
      <Radio
      
      isDisabled={disabled.stripe}
      value="stripe" >
      Credit/Debit card (Processed via Stripe)
      </Radio>
     
    </Radio.Group>
   
      <Button
    css={{"width":"50%","marginTop":"10px"}}
    onPress={loadPayment}
    color="primary" auto ghost>

          Pay
        </Button>
   
    </Container>
    
  </>

  )
}

export async function getServerSideProps({ query }) {
  return {
    props: query,
  };
}