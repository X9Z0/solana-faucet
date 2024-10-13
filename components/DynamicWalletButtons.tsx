"use client";
import React from "react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

const DynamicWalletButtons: React.FC = () => {
  return (
    <>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </>
  );
};

export default DynamicWalletButtons;
