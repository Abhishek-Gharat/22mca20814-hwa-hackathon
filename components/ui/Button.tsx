"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-display font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    primary: "bg-ember text-white hover:bg-ember-deep active:scale-95",
    ghost: "text-ink hover:bg-ink-soft/30 active:bg-ink-soft/50",
    outline: "border border-line text-ink hover:bg-ink active:bg-ink/5",
    secondary: "bg-ink text-white hover:bg-ember active:scale-95",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3.5 text-lg",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} disabled={disabled} {...props} />
  );
}
