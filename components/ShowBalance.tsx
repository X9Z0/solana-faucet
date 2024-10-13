"use client";
import { useEffect } from "react";
import { useBalanceContext } from "./context/solbalance";

export const ShowBalance = () => {
  const { sol, getBalance } = useBalanceContext();
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className="rounded-3xl border bg-card shadow">
      <div>
        <div className="flex items-baseline space-x-6 p-4 justify-center">
          <div className="text-7xl font-extrabold tracking-tight">
            <span className="grad-back bg-clip-text text-transparent">
              {sol.toFixed(2)}
            </span>
          </div>
          <div className="text-4xl font-semibold text-muted-foreground">
            SOL
          </div>
        </div>
      </div>
    </div>
  );
};
