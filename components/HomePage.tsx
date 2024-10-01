import { AirDrop } from "./AirDrop";
import { ConnectWallet } from "./ConnectWallet";
import { Description } from "./Description";

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-col-2 grid-row-2 gap-4 p-4">
        <ConnectWallet />
        <AirDrop />
        <Description />
      </div>
    </div>
  );
};
