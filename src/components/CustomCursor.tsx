import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower trailing spring for the thread effect
  const threadSpring = { damping: 30, stiffness: 150 };
  const threadX = useSpring(cursorX, threadSpring);
  const threadY = useSpring(cursorY, threadSpring);

  // Even slower for outer thread
  const outerThreadSpring = { damping: 35, stiffness: 100 };
  const outerThreadX = useSpring(cursorX, outerThreadSpring);
  const outerThreadY = useSpring(cursorY, outerThreadSpring);

  // Rotation based on movement
  const rotation = useTransform(
    [cursorXSpring, threadX],
    ([x, tx]: number[]) => (x - tx) * 2
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail point occasionally
      if (Math.random() > 0.7) {
        setTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
          return newTrail.slice(-5);
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('button, a, [data-cursor="pointer"]')) {
        setIsHovering(true);
        const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
      } else if (target.closest('[data-cursor="grab"]')) {
        setIsHovering(true);
        setCursorText("drag");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    // Clear old trail points
    const trailInterval = setInterval(() => {
      setTrail(prev => prev.slice(-3));
    }, 100);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(trailInterval);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Thread trail - fashion stitch effect */}
      <svg className="fixed inset-0 pointer-events-none z-[9996] w-full h-full">
        <motion.line
          x1={outerThreadX}
          y1={outerThreadY}
          x2={threadX}
          y2={threadY}
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity={0.3}
        />
        <motion.line
          x1={threadX}
          y1={threadY}
          x2={cursorXSpring}
          y2={cursorYSpring}
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity={0.5}
        />
      </svg>

      {/* Stitch marks trail */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9995]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <line
              x1="0" y1="4" x2="8" y2="4"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              opacity={0.4}
            />
          </svg>
        </motion.div>
      ))}

      {/* Needle cursor - editorial cross */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
        }}
      >
        {/* Vertical needle line */}
        <motion.div
          className="absolute bg-foreground"
          style={{
            width: 1.5,
            left: -0.75,
          }}
          animate={{
            height: isClicking ? 16 : isHovering ? 28 : 20,
            top: isClicking ? -8 : isHovering ? -14 : -10,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Horizontal needle line */}
        <motion.div
          className="absolute bg-foreground"
          style={{
            height: 1.5,
            top: -0.75,
          }}
          animate={{
            width: isClicking ? 16 : isHovering ? 28 : 20,
            left: isClicking ? -8 : isHovering ? -14 : -10,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Center dot - needle eye */}
        <motion.div
          className="absolute rounded-full bg-primary"
          animate={{
            width: isClicking ? 4 : isHovering ? 8 : 5,
            height: isClicking ? 4 : isHovering ? 8 : 5,
            x: isClicking ? -2 : isHovering ? -4 : -2.5,
            y: isClicking ? -2 : isHovering ? -4 : -2.5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Hover state - fabric swatch outline */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="border border-dashed border-primary/40"
          animate={{
            width: isHovering ? 48 : 0,
            height: isHovering ? 48 : 0,
            opacity: isHovering ? 1 : 0,
            rotate: isHovering ? 3 : 0,
          }}
          style={{
            marginLeft: isHovering ? -24 : 0,
            marginTop: isHovering ? -24 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* Cursor text - handwritten label */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <motion.div
            className="font-handwritten text-sm text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-dashed border-primary/30"
            initial={{ opacity: 0, x: 15, y: 15, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              x: 24,
              y: 24,
              rotate: -3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
