"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SwitchToggle } from "@/components/SwitchToggle";
import Dialer from "@/components/Dialer";
import { BalanceProvider } from "@/components/context/solbalance";
import { ShowBalance } from "@/components/ShowBalance";
import { SendToken } from "@/components/SendToken";
import { SignMessage } from "@/components/SignMessage";
import { motion } from "framer-motion";
import ConnectButton from "@/components/ConnectButtons";
import AuthenticationModal from "@/components/authentication";
import { useState } from "react";
function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <BalanceProvider>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {!isAuth && <AuthenticationModal setIsAuth={setIsAuth} />}
              <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-[1000px] p-2 mb-3 flex justify-end">
                  <SwitchToggle />
                </div>
                <div className="w-[1000px] rounded-xl border bg-card shadow p-6 flex justify-between items-center ">
                  <ConnectButton />
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
            </motion.div>
          </BalanceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
