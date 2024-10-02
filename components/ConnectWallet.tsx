"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const ConnectWallet = () => {
  return (
    <div className="gap-2 flex items-center justify-center">
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  );
};
