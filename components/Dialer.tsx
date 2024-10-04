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
    <div className="relative flex flex-col items-center justify-center border-2 border-slate-100 p-2 w-[250px] h-[500px]">
      <div className="relative mb-4 border-2 border-red-500">
        <div
          className="dialer w-32 h-32 rounded-full border-4 border-gray-500"
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
              transform: `rotate(${index * 15}deg) translateY(-85px)`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 ">
        <Input
          type="number"
          className="text-center mt-3"
          value={currentValue}
          readOnly
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
