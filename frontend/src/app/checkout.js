import {loadStripe} from "@stripe/stripe-js"

export async function checkout({lineItems}) {

    
    if(!window.ethereum){
        alert("Please connect your wallet to proceed");
        return;
    }
    let stripepromise = null;
    let getstripe =()=>{
        if(!stripepromise){
            stripepromise = loadStripe("pk_test_51N0ovPSBhJJNC5o19avLwP5xrQtgRLQyxpjFJcDbkcOSNcarDaHpJGf1FOeFoGmpEGxOseUgqK8RJaDBmDqGfnUq00KBXCQiV3");
        }
        return stripepromise;
    }
        const stripe = await getstripe();
        await stripe.redirectToCheckout({
            mode:"payment",
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl:window.location.origin,
    });
    //alert if payment is successful
    const url = new URL(window.location.href);
    const session_id = url.searchParams.get("session_id");
    if(session_id){
        alert("Payment Successful");
    }
    
}