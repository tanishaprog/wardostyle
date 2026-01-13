import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PolaroidCardProps {
  children: ReactNode;
  rotation?: number;
  label?: string;
  className?: string;
  delay?: number;
}

export const PolaroidCard = ({
  children,
  rotation = 0,
  label,
  className = "",
  delay = 0,
}: PolaroidCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: rotation + 3,
        y: -10,
        transition: { duration: 0.3 },
      }}
      className={`bg-card p-3 pb-10 shadow-lifted cursor-pointer ${className}`}
    >
      {children}
      {label && (
        <p className="font-handwritten text-lg text-center text-muted-foreground mt-2 absolute bottom-2 left-0 right-0">
          {label}
        </p>
      )}
    </motion.div>
  );
};
