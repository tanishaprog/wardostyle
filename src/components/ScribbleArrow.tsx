import { motion } from "framer-motion";

interface ScribbleArrowProps {
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  delay?: number;
}

export const ScribbleArrow = ({
  direction = "right",
  className = "",
  delay = 0,
}: ScribbleArrowProps) => {
  const rotations = {
    left: 180,
    right: 0,
    up: -90,
    down: 90,
  };

  return (
    <motion.svg
      width="80"
      height="40"
      viewBox="0 0 80 40"
      className={className}
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <motion.path
        d="M5 20 Q20 15 35 20 T65 18 L55 12 M65 18 L55 26"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
      />
    </motion.svg>
  );
};
