"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const ConnectButton = () => {
  return (
    <div className="flex flex-col rounded-3xl border bg-card shadow p-4 items-center gap-4 h-[500px] w-[350px]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Connect Your Wallet
      </h1>
      <div className="flex flex-col w-full gap-4">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default ConnectButton;
