import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionTransition({ children, className = "", id, disableTransform = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Zero-latency smooth entry & exit:
  // Subtle, high-performance transforms that don't delay or lag the user experience
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.4, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.985, 1, 1, 0.985]);

  return (
    <motion.div
      id={id}
      ref={containerRef}
      style={disableTransform ? { opacity } : { scale, opacity }}
      className={`w-full py-4 md:py-8 flex flex-col justify-center will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
