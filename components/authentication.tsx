"use client";

import bs58 from "bs58";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";

interface ChildComponentProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticationModal: React.FC<ChildComponentProps> = ({ setIsAuth }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [publickey, setPublickey] = useState<string>("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { publicKey, signMessage } = useWallet();

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
  const handleAuthenticate = () => {
    setShowDialog(true);
    if (publicKey) setPublickey(publicKey?.toString());
  };

  const handleVerify = async () => {
    if (!message) {
      toast({
        title: "Error",
        description: "Empty message not allowed. Please provide a message.",
        variant: "destructive",
      });
      return;
    }

    try {
      await SignMessage();
      setIsAuth(true);
      setShowDialog(false);
      toast({
        title: "Success",
        description: "Authentication successful!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>
      <div className="relative z-10">
        <div className="group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-800 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Button
            onClick={handleAuthenticate}
            className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
          >
            <span className="pr-6 text-purple-400">Authenticate</span>
          </Button>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Authentication</DialogTitle>
            <DialogDescription>
              Please sign a message to check your authenticity.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="publicKey" className="text-right col-span-1">
                Public Key
              </label>
              <Input
                id="publicKey"
                value={publickey}
                className="col-span-3"
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="message" className="text-right col-span-1">
                Message
              </label>
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3"
                placeholder="Enter a message to sign"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button className="btn-grad" onClick={handleVerify}>
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthenticationModal;
