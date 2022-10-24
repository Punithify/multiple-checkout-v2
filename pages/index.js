import {Container,Text ,Radio,Button,Loading,Grid} from '@nextui-org/react'
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
      console.log("hello1")
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
    if(scriptLoaded){
      const res=await displayRazorpay()
      setButtonDisabled(res)
    }
     //for the razorpay cancel button
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
    <Grid.Container 
     justify="center"
     alignItems='center'
     css={{"marginTop":"$14"}}
    >
      <Grid
   
      >
      <Text h4>Payment</Text>
  <Text h3>All transactions are secure and encrypted.</Text>
  <Radio.Group orientation="vertical"
  aria-label='payments'
   defaultValue={country === "IN"?"razorpay" :"stripe"}
   css={{"marginTop":"$10"}}
  >
      <Radio 
      justify="center"

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
    css={{"width":"100%","marginTop":"$8"}}
    onPress={loadPayment}
    color="primary" auto ghost>
        {buttonDisabled?( <Loading  color="primary" size="md" />):"Pay"}
        </Button>
      </Grid>
    </Grid.Container>
    
  </>

  )
}

export async function getServerSideProps({ query }) {
  return {
    props: query,
  };
}




<svg xmlns="http://www.w3.org/2000/svg" width="163" height="80.9" class="mx-auto" viewBox="-252.3 356.1 163 80.9" enable-background="new -252.3 356.1 163 80.9"><path stroke="#B2B2B2" stroke-width="2" stroke-miterlimit="10" d="M-108.9 404.1v30c0 1.1-.9 2-2 2h-120.1c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1" fill="none"></path><circle fill="#B2B2B2" cx="-227.8" cy="361.9" r="1.8"></circle><circle fill="#B2B2B2" cx="-222.2" cy="361.9" r="1.8"></circle><circle fill="#B2B2B2" cx="-216.6" cy="361.9" r="1.8"></circle><path stroke="#B2B2B2" stroke-width="2" stroke-miterlimit="10" d="M-128.7 400.1h36.7m-3.6-4.1l4 4.1-4 4.1" fill="none"></path></svg>