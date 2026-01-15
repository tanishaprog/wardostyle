import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = moves opposite to scroll
  className?: string;
  offset?: number; // Initial offset in pixels
}

export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = "",
  offset = 0,
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset - 100 * speed, offset + 100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating shape with parallax
interface ParallaxShapeProps {
  shape?: "circle" | "square" | "blob";
  size?: number;
  color?: string;
  speed?: number;
  className?: string;
  blur?: boolean;
}

export const ParallaxShape = ({
  shape = "circle",
  size = 100,
  color = "hsl(var(--primary) / 0.2)",
  speed = 0.3,
  className = "",
  blur = true,
}: ParallaxShapeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-lg rotate-12",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
  };

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        rotate,
        scale,
        width: size, 
        height: size,
        backgroundColor: color,
      }}
      className={`absolute pointer-events-none ${shapeStyles[shape]} ${blur ? "blur-2xl" : ""} ${className}`}
    />
  );
};

// Text with parallax reveal
interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const ParallaxText = ({
  children,
  className = "",
  direction = "up",
}: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const directionMap = {
    up: { initial: 50, final: 0 },
    down: { initial: -50, final: 0 },
    left: { initial: 50, final: 0 },
    right: { initial: -50, final: 0 },
  };

  const isVertical = direction === "up" || direction === "down";
  const movement = directionMap[direction];

  const transform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [movement.initial, movement.final]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        [isVertical ? "y" : "x"]: transform,
        opacity,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
