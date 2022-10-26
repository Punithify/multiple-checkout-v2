import {Container,Text ,Radio,Button,Loading,Grid} from '@nextui-org/react'
import {useState,useEffect} from "react"
import stripeCheckout from '../payment/stripe-checkout';
import { displayRazorpay } from '../payment/razorpay-checkout';
import Script from 'next/script'

export default function Home({country}) {
 
  const [disabled,setDisabled]=useState({razorpay:true,stripe:false})
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false)
 
  country = decodeURIComponent(country);
 
  const loadStripe= ()=>{
    stripeCheckout()
  }

  const loadRazorpay=async()=>{
    if(scriptLoaded){
      console.log("razorpay is here")
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
      return;
    } 
  }, [country]);



  return (
    <>
      <>
      <Script
        id="razorpay-script"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          setScriptLoaded(true)
        }}
      />
    </>
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



