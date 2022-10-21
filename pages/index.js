import {Container,Text ,Radio,Button,Loading} from '@nextui-org/react'
import {useState,useEffect} from "react"
import stripeCheckout from '../payment/stripe-checkout';
import { displayRazorpay } from '../payment/razorpay-checkout';

export default function Home({country}) {
 
  const [disabled,setDisabled]=useState({razorpay:true,stripe:false})
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false)
 
  country = decodeURIComponent(country);
    const loadRazorpayCheckout = () => {
    if (window.razorpay) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  };

  const loadStripe= ()=>{
    stripeCheckout()
    
  }

  const loadRazorpay=async()=>{
    const res=await displayRazorpay()
    setButtonDisabled(res)
  }


  const loadPayment=()=>{
    setButtonDisabled(true)
    return disabled.razorpay?loadStripe():loadRazorpay()
  }

  useEffect(() => {
    if (country === "IN") {
      setDisabled({razorpay:false,stripe:true});
      loadRazorpayCheckout()
      return;
    } 
  }, [country]);



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
   defaultValue={country === "IN"?"razorpay" :"stripe"}
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
      disabled={buttonDisabled}
    css={{"width":"100%","marginTop":"10px"}}
    onPress={loadPayment}
    color="primary" auto ghost>
        {buttonDisabled?( <Loading  color="primary" size="md" />):"Pay"}
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