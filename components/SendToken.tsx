import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useBalanceContext } from "./context/solbalance";
import { IconSpinner } from "./Spinner";

export const SendToken = () => {
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();
  const { getBalance } = useBalanceContext();

  const sendTokens = async () => {
    if (!wallet.publicKey) {
      toast({
        variant: "destructive",
        title: "Wallet is not connected",
        description: "Public key was not found please connect your wallet and",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
      return;
    }
    try {
      if (!recipientPublicKey || !amount) {
        toast({
          variant: "destructive",
          title: "Invalid input",
          description: "Please provide a valid recipient address and amount.",
        });
        return;
      }

      const recipient = new PublicKey(recipientPublicKey);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipient,
          lamports: amount * LAMPORTS_PER_SOL,
        }),
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      getBalance();

      toast({
        variant: "default",
        title: "Transaction sent",
        description: `Transaction signature: ${signature}`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };
  return (
    <div className="rounded-3xl border relative flex flex-col justify-center bg-card shadow p-4">
      <IconSpinner
        size={"icon"}
        variant={"outline"}
        onClick={sendTokens}
        className="w-12 h-12 flex justify-center items-center absolute top-0 right-0 translate-x-1/2 translate-y-0 rounded-full"
        icon={<SendIcon className="w-6 h-6 text-[#6a3093] " />}
      />
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="recipientPublicKey" className="text-lg">
            Recipients Public Key
          </Label>
          <Input
            id="recipientPublicKey"
            placeholder="Enter public key"
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-lg">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        {/* <div className="flex justify-center items-center pt-2"> */}
        {/*   <Button className="btn-grad w-full">Send</Button> */}
        {/* </div> */}
      </div>
    </div>
  );
};
