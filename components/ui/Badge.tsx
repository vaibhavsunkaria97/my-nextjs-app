import React from "react";

// We add 'className' to the interface so TypeScript knows it is allowed
interface BadgeProps {
  children: React.ReactNode;
  className?: string; 
}

export const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <span 
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {children}
    </span>
  );
};