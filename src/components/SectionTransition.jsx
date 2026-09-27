import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionTransition({ children, className = "", id, disableTransform = false }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic fluid Apple-style entry & exit:
  // Distinct spring-like scaling and elevation without sluggishness
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.91, 1, 1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0, 1, 1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [65, 0, 0, -45]);

  return (
    <motion.div
      id={id}
      ref={containerRef}
      style={disableTransform ? { opacity } : { scale, opacity, y }}
      className={`w-full py-6 md:py-10 flex flex-col justify-center ${!disableTransform ? 'will-change-transform' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
