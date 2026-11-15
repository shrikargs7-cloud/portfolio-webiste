import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Crosshair, Orbit, Layers, Wand2 } from 'lucide-react';

const CURSOR_MODES = [
  { id: 'multi', label: 'Multi', icon: Layers },
  { id: 'ribbon', label: 'Ribbon', icon: Sparkles },
  { id: 'orbital', label: 'Orbital', icon: Orbit },
  { id: 'crosshair', label: 'Grid', icon: Crosshair },
  { id: 'particles', label: 'Sparks', icon: Wand2 }
];

function OrbitingMoon({ mouseX, mouseY, index, isVisible, hasLabel }) {
  const springConfig = {
    damping: 16 + index * 4,
    stiffness: 300 - index * 20,
    mass: 0.2 + index * 0.08
  };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const angle = (index / 6) * Math.PI * 2;
  const radius = 22 + index * 2;

  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9995] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: 4,
        height: 4,
        opacity: isVisible && !hasLabel ? 0.9 - index * 0.1 : 0
      }}
      animate={{ rotate: 360 }}
      transition={{ rotate: { repeat: Infinity, duration: 2.8 + index * 0.5, ease: 'linear' } }}
    >
      <div
        style={{
          position: 'absolute',
          top: Math.sin(angle) * radius,
          left: Math.cos(angle) * radius,
          width: '100%',
          height: '100%',
          backgroundColor: index % 2 === 0 ? '#C75D35' : '#2B231D',
          borderRadius: '50%'
        }}
      />
    </motion.div>
  );
}

function RibbonBead({ mouseX, mouseY, index, isVisible, hasLabel }) {
  const springConfig = {
    damping: 20 + index * 3,
    stiffness: 420 - index * 42,
    mass: 0.12 + index * 0.06
  };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const size = Math.max(4, 14 - index * 1.6);

  return (
    <motion.div
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9994] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        backgroundColor: index % 2 === 0 ? '#C75D35' : '#D09B65',
        opacity: isVisible && !hasLabel ? 0.45 - index * 0.055 : 0
      }}
    />
  );
}

export default function CustomCursor({ cursorState }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_cursor_mode') || 'multi';
    }
    return 'multi';
  });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [sparks, setSparks] = useState([]);
  const lastSparkTime = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const fastX = useSpring(mouseX, { damping: 28, stiffness: 460, mass: 0.08 });
  const fastY = useSpring(mouseY, { damping: 28, stiffness: 460, mass: 0.08 });

  const midX = useSpring(mouseX, { damping: 26, stiffness: 220, mass: 0.35 });
  const midY = useSpring(mouseY, { damping: 26, stiffness: 220, mass: 0.35 });

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_cursor_mode', nextMode);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Spawn trailing spark particles in 'particles' or 'multi' mode
      const now = performance.now();
      if ((mode === 'particles' || mode === 'multi') && now - lastSparkTime.current > 45) {
        lastSparkTime.current = now;
        const id = now + Math.random();
        const dx = (Math.random() - 0.5) * 26;
        const dy = (Math.random() - 0.5) * 26 - 8;
        const color = Math.random() > 0.4 ? '#C75D35' : '#D09B65';
        setSparks((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY, dx, dy, color }]);
        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id));
        }, 480);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 550);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, mode]);

  const hasLabel = Boolean(cursorState?.label);
  const labelText = cursorState?.label || '';

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (min-width: 768px) {
          body { cursor: none; }
          a, button, input, select, textarea, [role="button"] { cursor: none !important; }
        }
      `
        }}
      />

      {/* Click Ripple Shockwaves (Active in all modes) */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
            className="hidden md:block pointer-events-none fixed w-10 h-10 rounded-full border-2 border-[#C75D35] z-[9993]"
          />
        ))}
      </AnimatePresence>

      {/* Trailing Spark Particles (Active in Multi & Sparks modes) */}
      <AnimatePresence>
        {(mode === 'particles' || mode === 'multi') &&
          !hasLabel &&
          sparks.map((s) => (
            <motion.div
              key={s.id}
              initial={{ x: s.x, y: s.y, scale: 1, opacity: 0.85 }}
              animate={{ x: s.x + s.dx, y: s.y + s.dy, scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
                backgroundColor: s.color
              }}
              className="hidden md:block pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 rounded-full z-[9993]"
            />
          ))}
      </AnimatePresence>

      {/* Fluid Ribbon Trail (Active in Multi & Ribbon modes) */}
      {(mode === 'ribbon' || mode === 'multi') &&
        Array.from({ length: 7 }).map((_, i) => (
          <RibbonBead
            key={`ribbon-${i}`}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            isVisible={isVisible}
            hasLabel={hasLabel}
          />
        ))}

      {/* Orbital Constellation Moons (Active in Multi & Orbital modes) */}
      {(mode === 'orbital' || mode === 'multi') &&
        Array.from({ length: mode === 'multi' ? 3 : 6 }).map((_, i) => (
          <OrbitingMoon
            key={`orbit-${i}`}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            isVisible={isVisible}
            hasLabel={hasLabel}
          />
        ))}

      {/* Architectural Designer Crosshair (Active in Crosshair mode) */}
      {mode === 'crosshair' && isVisible && !hasLabel && (
        <>
          <motion.div
            className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9995] h-[1px] w-10 bg-[#C75D35]/80"
            style={{ x: fastX, y: fastY, translateX: '-50%', translateY: '-50%' }}
          />
          <motion.div
            className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9995] w-[1px] h-10 bg-[#C75D35]/80"
            style={{ x: fastX, y: fastY, translateX: '-50%', translateY: '-50%' }}
          />
        </>
      )}

      {/* Magnetic Outer Ring / Contextual Label Pill */}
      <motion.div
        className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[9998] items-center justify-center rounded-full"
        style={{
          x: midX,
          y: midY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: hasLabel ? 'auto' : isHoveringInteractive ? 46 : isClicking ? 24 : 34,
          height: hasLabel ? 34 : isHoveringInteractive ? 46 : isClicking ? 24 : 34,
          paddingLeft: hasLabel ? 14 : 0,
          paddingRight: hasLabel ? 14 : 0,
          backgroundColor: hasLabel
            ? '#2B231D'
            : isHoveringInteractive
            ? 'rgba(199, 93, 53, 0.14)'
            : 'rgba(255, 255, 255, 0)',
          border: hasLabel
            ? '1.5px solid #C75D35'
            : isHoveringInteractive
            ? '2px solid #C75D35'
            : '1.5px solid rgba(43, 35, 29, 0.45)',
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 26
        }}
      >
        <AnimatePresence mode="wait">
          {hasLabel && (
            <motion.span
              key={labelText}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.12 }}
              className="font-mono text-[11px] font-bold tracking-wider uppercase text-white whitespace-nowrap"
            >
              {labelText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precision Center Pointer Dot */}
      <motion.div
        className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: fastX,
          y: fastY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 10 : isHoveringInteractive ? 6 : 8,
          height: isClicking ? 10 : isHoveringInteractive ? 6 : 8,
          backgroundColor: '#C75D35',
          opacity: isVisible && !hasLabel ? 1 : 0
        }}
      />

      {/* Bottom-Right Live Cursor Animation Switcher */}
      <div className="hidden md:flex fixed bottom-5 right-5 z-[120] items-center gap-1 p-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-xl border-2 border-[#2B231D]/25 shadow-xl font-mono text-[10px]">
        <span className="px-2 text-[#2B231D] font-bold uppercase tracking-wider">Cursor:</span>
        {CURSOR_MODES.map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleModeChange(m.id)}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1 font-bold transition-all ${
                active
                  ? 'bg-[#2B231D] text-white shadow-xs'
                  : 'text-[#382E27] hover:bg-[#F5F1EB]'
              }`}
              title={`Switch cursor animation to ${m.label}`}
            >
              <Icon className={`w-3 h-3 ${active ? 'text-[#D09B65]' : 'text-[#C75D35]'}`} />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
