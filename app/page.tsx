import { HomePage } from "@/components/HomePage";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <ConnectionProvider endpoint={"blalala"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <HomePage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
