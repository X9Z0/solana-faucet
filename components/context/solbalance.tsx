import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useState } from "react";

interface BalanceProps {
  sol: number;
  getBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const getBalance = async () => {
    if (wallet.publicKey) {
      const balance: number = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  return (
    <BalanceContext.Provider value={{ sol: balance, getBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error(
      "useBalanceContext must be used within the BalanceProvider",
    );
  }
  return context;
};
