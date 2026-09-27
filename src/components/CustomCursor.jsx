import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Sub-component for individual tail particles (Moons orbiting the cursor path)
function OrbitingMoon({ mouseX, mouseY, index, isVisible, hasLabel }) {
  const springConfig = {
    damping: 15 + index * 4,
    stiffness: 300 - index * 20,
    mass: 0.2 + index * 0.1
  };
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Math for orbit offset
  const angle = (index / 8) * Math.PI * 2;
  const radius = 24 + index * 2;
  
  // We use a separate motion value to spin them around the trail path
  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9995] rounded-full mix-blend-difference"
      style={{
        x, 
        y,
        translateX: '-50%', 
        translateY: '-50%',
        width: 3,
        height: 3,
        backgroundColor: '#FFFFFF',
        opacity: (isVisible && !hasLabel) ? 1 - (index * 0.1) : 0
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        rotate: { repeat: Infinity, duration: 3 + index, ease: "linear" }
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: Math.sin(angle) * radius,
          left: Math.cos(angle) * radius,
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%'
        }}
      />
    </motion.div>
  );
}

export default function CustomCursor({ cursorState }) {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs
  const springFast = { damping: 25, stiffness: 400, mass: 0.1 };
  const springMid = { damping: 30, stiffness: 200, mass: 0.4 };

  const fastX = useSpring(mouseX, springFast);
  const fastY = useSpring(mouseY, springFast);
  
  const midX = useSpring(mouseX, springMid);
  const midY = useSpring(mouseY, springMid);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseEnter = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  const hasLabel = Boolean(cursorState?.label);
  const labelText = cursorState?.label || "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { cursor: none; }
        a, button, input, select, textarea { cursor: none !important; }
      `}} />

      {/* 
        LAYER 0: The Orbiting Moons Trail 
        Instead of a simple line, these dots spiral around the cursor path
      */}
      {Array.from({ length: 8 }).map((_, i) => (
        <OrbitingMoon 
          key={i} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          index={i} 
          isVisible={isVisible} 
          hasLabel={hasLabel} 
        />
      ))}

      {/* 
        LAYER 1: The Atomic Gyroscope (3D Rotating Rings)
      */}
      <motion.div
        className="hidden md:flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          x: midX,
          y: midY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: (isVisible && !hasLabel) ? 1 : 0,
          perspective: 600
        }}
      >
        <div className="relative w-14 h-14 transform-style-3d">
          {/* Ring 1 (X-Axis Orbit) */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#C75D35] opacity-60"
            animate={{ rotateX: 360, rotateY: 45, rotateZ: isClicking ? 180 : 0, scale: isClicking ? 0.5 : 1 }}
            transition={{ rotateX: { repeat: Infinity, duration: 4, ease: "linear" }, scale: { type: "spring" } }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          {/* Ring 2 (Y-Axis Orbit) */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#C75D35] opacity-60"
            animate={{ rotateY: 360, rotateX: 45, rotateZ: isClicking ? -180 : 0, scale: isClicking ? 0.5 : 1 }}
            transition={{ rotateY: { repeat: Infinity, duration: 3.5, ease: "linear" }, scale: { type: "spring" } }}
            style={{ transformStyle: 'preserve-3d' }}
          />
          {/* Ring 3 (Z-Axis Orbit) */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#C75D35] opacity-30 border-dashed"
            animate={{ rotateZ: 360, scale: isClicking ? 0.5 : 1.2 }}
            transition={{ rotateZ: { repeat: Infinity, duration: 8, ease: "linear" }, scale: { type: "spring" } }}
          />
        </div>
      </motion.div>

      {/* 
        LAYER 2: Core Nucleus / Pill Container
      */}
      <motion.div
        className="hidden md:flex items-center justify-center pointer-events-none fixed top-0 left-0 z-[9999] overflow-hidden mix-blend-difference"
        style={{
          x: fastX,
          y: fastY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: hasLabel ? 110 : isClicking ? 8 : 12,
          height: hasLabel ? 36 : isClicking ? 8 : 12,
          backgroundColor: hasLabel ? '#FFFFFF' : '#FFFFFF',
          borderRadius: hasLabel ? 8 : 12, // Square pill vs circle
          rotate: isClicking && !hasLabel ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <AnimatePresence>
          {hasLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="flex items-center justify-center w-full h-full"
            >
              <span className="text-[#050505] font-mono text-[11px] font-bold tracking-[0.2em] uppercase leading-none mix-blend-difference">
                &lt; {labelText} /&gt;
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
