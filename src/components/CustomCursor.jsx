import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ cursorState }) {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  const hasLabel = Boolean(cursorState?.label);

  return (
    <>
      {/* Tiny solid inner dot (instant follow) */}
      <motion.div
        className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 bg-[#C75D35] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && !hasLabel ? 1 : 0
        }}
      />

      {/* Elegant outer ring / expanding bubble (smooth follow) */}
      <motion.div
        className="hidden md:flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[9998] rounded-full overflow-hidden"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: hasLabel ? 90 : isClicking ? 28 : 40,
          height: hasLabel ? 90 : isClicking ? 28 : 40,
          backgroundColor: hasLabel ? '#C75D35' : 'rgba(199, 93, 53, 0.05)',
          borderColor: hasLabel ? 'rgba(199, 93, 53, 1)' : 'rgba(199, 93, 53, 0.4)',
          borderWidth: hasLabel ? 0 : 1,
          boxShadow: hasLabel 
            ? '0 12px 30px rgba(199, 93, 53, 0.3)' 
            : isClicking 
              ? '0 0 10px rgba(199, 93, 53, 0.1)' 
              : 'none',
          scale: isClicking && !hasLabel ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: hasLabel ? 1 : 0, 
            scale: hasLabel ? 1 : 0.5 
          }}
          transition={{ duration: 0.2 }}
          className="text-[#FFFFFF] font-mono text-[11px] font-bold tracking-wider text-center leading-tight px-2"
        >
          {cursorState?.label}
        </motion.span>
      </motion.div>
    </>
  );
}
