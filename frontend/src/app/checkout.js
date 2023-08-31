import {loadStripe} from "@stripe/stripe-js"
import { ethers } from "ethers";
import interfaceData from "../components/interface.json";

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
        const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", interfaceData.abi, signer);
        const transaction = await contract.sendTransaction({
            to: window.ethereum.selectedAddress,
            value: ethers.utils.parseEther("0.001")
        });
        await transaction.wait();
        console.log("Ether sent successfully");
    }
    
}                         