import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

export const ConnectWallet = () => {
  return (
    <div className="bg-blue-300 flex items-center justify-center">
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  );
};
