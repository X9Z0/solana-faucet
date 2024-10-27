import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { BalanceProvider } from "@/components/context/solbalance";
import { HomePage } from "@/components/HomePage";
import AuthComponent from "@/components/AuthComponent";

export default function WalletConnectionProvider() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <BalanceProvider>
            <AuthComponent />
            <HomePage />
          </BalanceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
