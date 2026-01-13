import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InteractiveButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground shadow-playful hover:shadow-lifted",
  secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-lifted",
  outline: "border-2 border-charcoal bg-transparent text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const InteractiveButton = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
}: InteractiveButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`font-display font-semibold rounded-sm transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.button>
  );
};
