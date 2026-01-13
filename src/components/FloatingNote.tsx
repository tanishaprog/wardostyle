import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingNoteProps {
  children: ReactNode;
  rotation?: number;
  delay?: number;
  color?: "yellow" | "pink" | "accent" | "secondary";
  className?: string;
}

const colorClasses = {
  yellow: "bg-yellow text-yellow-foreground",
  pink: "bg-pink text-pink-foreground",
  accent: "bg-accent text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

export const FloatingNote = ({
  children,
  rotation = -2,
  delay = 0,
  color = "yellow",
  className = "",
}: FloatingNoteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: rotation + 2,
        transition: { duration: 0.2 },
      }}
      className={`${colorClasses[color]} px-4 py-3 shadow-playful font-handwritten text-xl cursor-pointer select-none ${className}`}
      style={{ borderRadius: "2px 8px 4px 12px" }}
    >
      {children}
    </motion.div>
  );
};
