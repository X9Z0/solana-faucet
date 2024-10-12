"use client";
import React, { useMemo } from "react";
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

function App() {
  const endpoint = useMemo(() => apikey, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
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
              <div>
                <Dialer />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
