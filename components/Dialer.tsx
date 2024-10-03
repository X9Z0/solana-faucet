import { ChevronUp, RotateCw } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Dialer() {
  const [currentValue, setCurrentValue] = useState(0);
  const [rotation, setRotation] = useState(0);

  const totalMarks = 24;

  const rotateDialer = () => {
    const newRotation = rotation + 360 / totalMarks;
    setRotation(newRotation);
    setCurrentValue((prevValue) => (prevValue + 1) % totalMarks);
  };

  const resetDialer = () => {
    setRotation(0);
    setCurrentValue(0);
  };

  return (
    <div className="flex flex-col items-center border-2 border-slate-100 p-2 h-[500px]">
      <div className="relative mb-4 border-2 border-red-500">
        <div
          className="dialer w-24 h-24 rounded-full border-4 border-gray-500"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={rotateDialer}
        >
          <div className="dialer-inner absolute inset-0 flex items-center justify-center">
            <span className="text-sm">
              <ChevronUp />
            </span>
          </div>
        </div>
        {[...Array(totalMarks)].map((_, index) => (
          <div
            key={index}
            className="absolute w-0.5 h-3 bg-gray-400"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "top center",
              transform: `rotate(${index * 15}deg) translateY(-70px)`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 border-2 border-cyan-500">
        <Input type="number" className="" value={currentValue} readOnly />
        <Button variant={"outline"} size="icon" onClick={resetDialer}>
          <RotateCw />
        </Button>
      </div>
    </div>
  );
}
