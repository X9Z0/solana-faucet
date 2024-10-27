"use client";
import { motion } from "framer-motion";
import { SwitchToggle } from "./SwitchToggle";
import ConnectButton from "./ConnectButtons";
import { ShowBalance } from "./ShowBalance";
import { SendToken } from "./SendToken";
import { SignMessage } from "./SignMessage";
import Dialer from "./Dialer";

export const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="relative"
    >
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
  );
};
