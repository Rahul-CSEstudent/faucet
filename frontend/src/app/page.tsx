"use client";

import { Separator } from "@/components/ui/separator";
import { WalletSection } from "@/components/wallet";
import StripeSection from "@/components/stripe";
// wallet dependencies
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli, localhost, Chain } from "wagmi/chains";

// const localnet: Chain = {
//   id: 31337,
//   name: "Localnet",
//   nativeCurrency: {
//     name: "Localnet Ethereum",
//     symbol: "TestETH",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ["http://127.0.0.1:8545/"],
//     },
//     public: {
//       http: ["http://127.0.0.1:8545/"],
//     },
//   },
//   network: "localhost",
// };

// wallet configuration
const chains = [arbitrum, mainnet, goerli, polygon, localhost];
const projectId ="114a664a86b8207ad96a89ad4b928069";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Home() {
  return (
    <main>
      <WagmiConfig config={wagmiConfig}>
        <div className="p-6">
          <WalletSection />
          <Separator className="my-6" />
         <StripeSection />
        </div>
      </WagmiConfig>

      {/* web3 modal dialog box */}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </main>
  );
}
