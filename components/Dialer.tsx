"use client";
import { ChevronUp, RotateCw } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useBalanceContext } from "./context/solbalance";
import { IconSpinner } from "./Spinner";

export default function Dialer() {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const wallet = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();
  const { getBalance } = useBalanceContext();

  const requestAirdrop = async () => {
    if (!wallet.publicKey) {
      console.error("Wallet public key is null or undefined");
      toast({
        variant: "destructive",
        title: "Wallet is not connected",
        description: "publicKey was not found please connect your wallet",
        action: <ToastAction altText=" Try Again">Try Again</ToastAction>,
      });
      return;
    }

    const amount = currentValue;

    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL,
      );
      await getBalance();
      toast({
        title: "Tokens added succesfully",
      });
    } catch (e) {
      console.error("Airdrop request failed", e);
      toast({
        variant: "destructive",
        title: "Airdrop request failed",
        description:
          e instanceof Error ? e.message : "an unsual error occurred",
      });
    }
  };

  const resetDialer = () => {
    let valuea: number = currentValue;
    const intervalDuration = 100;

    const intervalId = setInterval(() => {
      if (valuea <= 0) {
        clearInterval(intervalId);
        console.log("Dialer reset completed.");
        return;
      }

      handleClick();

      const newRotation = (valuea - 1) * (360 / totalMarks);
      setRotation(newRotation);
      setCurrentValue(valuea - 1);

      valuea--;
    }, intervalDuration);
  };
  const handleClick = () => {
    if (!audio) {
      const newAudio = new Audio("/audio/switch.mp3");
      newAudio.onerror = (e) => {
        console.error("Error loading audio file: ", e);
      };
      setAudio(newAudio);
      newAudio.play();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const totalMarks = 24;

  const rotateDialer = () => {
    handleClick();
    const newRotation = rotation + 360 / totalMarks;
    setRotation(newRotation);
    setCurrentValue((prevValue) => (prevValue + 1) % totalMarks);
  };

  return (
    <div className="relative rounded-3xl border bg-card flex flex-col items-center justify-center shadow p-2 w-[250px] h-[500px]">
      <div className="relative mb-4 ">
        <div
          className="dialer w-32 h-32 rounded-full border-4  "
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={rotateDialer}
        >
          <div className="dialer-inner absolute inset-0 flex items-center justify-center">
            <span className="text-sm">
              <ChevronUp color="#6a3093" />
            </span>
          </div>
        </div>
        {[...Array(totalMarks)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-0.5 h-3 ${index <= currentValue ? "dialer-marks" : "bg-gray-400"}`}
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "top center",
              transform: `rotate(${index * 15}deg) translateY(-85px)`,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 ">
        <Input
          type="number"
          className="text-center mt-3"
          value={currentValue}
          readOnly
        />
        <IconSpinner
          icon={"AirDrop"}
          onClick={requestAirdrop}
          className="btn-grad w-full"
        />
      </div>
      <div className="absolute right-0 bottom-0 p-4">
        <Button variant={"outline"} size="icon" onClick={resetDialer}>
          <RotateCw />
        </Button>
      </div>
    </div>
  );
}
