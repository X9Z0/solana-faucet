"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconSpinnerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  loadingText?: string;
}

export function IconSpinner({
  icon,
  loadingText = "Loading...",
  className,
  ...props
}: IconSpinnerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      setIsLoading(true);
      try {
        await props.onClick(event);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      className={cn("relative", className)}
      disabled={isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="sr-only">{loadingText}</span>
        </>
      ) : (
        icon
      )}
    </Button>
  );
}
