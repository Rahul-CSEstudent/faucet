import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePublicClient, useWalletClient } from "wagmi";
import { useState } from "react";
import { checkout } from "../app/checkout";

export default function StripeSection() {

  return (
    <>
      <p>Pay : <Button onClick={(() => {checkout({
        lineItems: [{price:"price_1NjIhSSBhJJNC5o1ZanpOmXy", quantity: 1}],
      })
    })}>Get tokens</Button></p>     
    </>
  );
}