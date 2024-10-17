import { useEffect } from "react";
import { useBalanceContext } from "./context/solbalance";
import { motion } from "framer-motion";

export const ShowBalance = () => {
  const { sol, getBalance } = useBalanceContext();
  useEffect(() => {
    const getsolB = async () => {
      await getBalance();
    };
    getsolB();
  }, [getBalance]);

  return (
    <div className="rounded-3xl border bg-card shadow">
      <div>
        <div className="flex items-baseline space-x-6 p-4 justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="text-7xl font-extrabold tracking-tight"
          >
            {/* <div className="text-7xl font-extrabold tracking-tight"> */}
            <span className="grad-back bg-clip-text text-transparent">
              {sol.toFixed(2)}
            </span>
            {/* </div> */}
          </motion.div>
          <div className="text-4xl font-semibold text-muted-foreground">
            SOL
          </div>
        </div>
      </div>
    </div>
  );
};
