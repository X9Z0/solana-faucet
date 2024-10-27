"use client";
import { useEffect, useState } from "react";
import AuthenticationModal from "./authentication";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
const AuthComponent = () => {
  const { toast } = useToast();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { connected } = useWallet();

  useEffect(() => {
    const firstVisit = sessionStorage.getItem("firstVisit");
    if (firstVisit === null) {
      toast({ title: "Welcome" });
      sessionStorage.setItem("firstVisit", "true");
    }
  }, [toast]);

  useEffect(() => {
    if (connected) {
      toast({ title: "Wallet Connected" });
      const authCookie = Cookies.get("authSign");
      if (authCookie) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        toast({ title: "Authenticate to continue" });
      }
    }
  }, [connected, toast]);

  return (
    <div>
      {!isAuth && connected && <AuthenticationModal setIsAuth={setIsAuth} />}
    </div>
  );
};

export default AuthComponent;
