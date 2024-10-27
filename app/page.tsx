"use client";

import dynamic from "next/dynamic";

const WalletConnectionProvider = dynamic(
  () => import("@/components/WalletConnectionProvider"),
  { ssr: false },
);

export default function App() {
  return <WalletConnectionProvider />;
}
