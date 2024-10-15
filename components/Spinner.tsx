"use client";

import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type sizee = "icon" | "default" | "sm" | "lg" | null | undefined;

type variantt =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface IconSpinnerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  loadingText?: string;
  size?: sizee;
  variant?: variantt;
}

export function IconSpinner({
  icon,
  loadingText = "Loading...",
  size = "default",
  variant = "default",
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
      size={size}
      variant={variant}
      {...props}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span className="sr-only">{loadingText}</span>
        </>
      ) : (
        icon
      )}
    </Button>
  );
}
