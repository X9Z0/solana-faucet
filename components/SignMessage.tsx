import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Pen } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { IconSpinner } from "./Spinner";

export const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();
  const { toast } = useToast();
  const [message, setMessage] = useState<string>("");
  const SignMessage = async () => {
    if (!publicKey) {
      toast({
        variant: "destructive",
        title: "Wallet is not Connected",
      });
      return;
    }
    if (!signMessage) {
      toast({
        variant: "destructive",
        title: "Signing message is not supported",
        description: "Your wallet does not support signing messages",
      });
      return;
    }
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      toast({
        variant: "destructive",
        title: "Message signature Invalid",
        description: "message was not signed",
      });
      return;
    }
    toast({
      title: "Message Signed successfully",
      description: `Message signature: ${bs58.encode(signature)}`,
    });
  };
  return (
    <div className="rounded-3xl border flex flex-col justify-center bg-card shadow p-4">
      <div className="space-y-4">
        <Label htmlFor="message" className="text-lg">
          Sign Message
        </Label>
        <div className="flex gap-2">
          <IconSpinner
            icon={<Pen className="w-6 h-6 text-[#6a3093] " />}
            onClick={SignMessage}
            variant={"outline"}
            size={"icon"}
            className="h-12 w-12"
          ></IconSpinner>
          <Input
            id="message"
            type="text"
            placeholder="Enter your message"
            className="h-12"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
