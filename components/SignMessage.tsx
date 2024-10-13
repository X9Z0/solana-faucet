import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";

export const SignMessage = () => {
  const {publicKey, signMessage} = useWallet();
  const {toast} = useToast();
  const [message, setMessage] = useState<string>("");
  async SignMessage = () => {
    if(!publicKey){
      toast({
        variant: "destructive",
        title: "Wallet is not Connected",
      })
      return;
    }
    if(!signMessage){
      toast({
        variant: "destructive",
        title: "Signing message is not supported",
        description: "Your wallet does not support signing messages",
      })
      return;
    }
  }
  return (
    <div className="rounded-3xl border flex flex-col justify-center bg-card shadow p-4">
      <div className="space-y-4">
        <Label htmlFor="message" className="text-lg">
          Sign Message
        </Label>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"icon"} className="h-12 w-12">
            <Pen className="w-6 h-6 text-[#6a3093] " />
          </Button>
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
