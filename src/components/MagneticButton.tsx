import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className = "",
  onClick,
  strength = 0.3,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-50, 50], [5, -5]);
  const rotateY = useTransform(xSpring, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.95 }}
      data-cursor="pointer"
    >
      <motion.span
        className="relative z-10 block"
        style={{
          x: useTransform(xSpring, (v) => v * 0.3),
          y: useTransform(ySpring, (v) => v * 0.3),
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
