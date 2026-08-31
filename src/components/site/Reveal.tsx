import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  /** Direction of the entry shift — brutalist: hard, short, linear-ish. */
  from?: "up" | "left" | "right";
  as?: ElementType;
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as: Tag = "div",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", `reveal-${from}`, visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}
