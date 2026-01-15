import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Cursor text */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] font-handwritten text-sm text-primary"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            translateX: 20,
            translateY: 20,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
};
