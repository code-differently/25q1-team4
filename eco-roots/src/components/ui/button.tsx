import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function buttonVariants({ variant }: { variant: ButtonProps["variant"] }) {
    switch (variant) {
      case "primary":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "secondary":
        return "bg-gray-500 text-white hover:bg-gray-600";
      case "outline":
        return "border border-gray-500 text-gray-500 hover:bg-gray-100";
      case "ghost":
        return "bg-transparent text-gray-500 hover:bg-gray-100";
      default:
        return "";
    }
  }

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => {
    const baseStyles =
    "px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
      : "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {props.children}
    </button>
  );
};