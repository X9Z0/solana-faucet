"use client";
import React, { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SwitchToggle } from "@/components/SwitchToggle";
import Dialer from "@/components/Dialer";
import { apikey } from "@/key";
import { BalanceProvider } from "@/components/context/solbalance";
import { ShowBalance } from "@/components/ShowBalance";
import { SendToken } from "@/components/SendToken";
import { SignMessage } from "@/components/SignMessage";

function App() {
  const [endpoint, setEndpoint] = useState<string>("");

  useEffect(() => {
    setEndpoint(apikey); // Set endpoint only on the client
  }, []);

  if (!endpoint) return null; // Avoid rendering until endpoint is set

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <BalanceProvider>
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="w-[1000px] p-2 mb-3 flex justify-end">
                <SwitchToggle />
              </div>
              <div className="w-[1000px] rounded-xl border bg-card shadow p-6 flex justify-between items-center ">
                <div className="flex flex-col rounded-3xl border bg-card shadow p-4 items-center gap-4 h-[500px] w-[350px]">
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Connect Your Wallet
                  </h1>
                  <div className="flex flex-col w-full gap-4">
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                  </div>
                </div>
                <div className="h-full space-y-6">
                  <ShowBalance />
                  <SendToken />
                  <SignMessage />
                </div>
                <div>
                  <Dialer />
                </div>
              </div>
            </div>
          </BalanceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
