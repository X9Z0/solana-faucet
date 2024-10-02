"use client";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/button";

export const ConnectWallet = () => {
  return (
    <div className="gap-2 flex items-center justify-center">
      <Button>
        <WalletMultiButton />
      </Button>
      <WalletDisconnectButton />
    </div>
  );
};
