// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// High-quality verified Unsplash stock imagery
const IMG = {
  network: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  abstractFluid: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  codeWorkspace: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  spatialInterface: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  cyberIntelligence: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  hardwareChip: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  minimalArchitecture: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  digitalGradient: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
} as const;

// per-image rest scale, keyed by img index (1-8). default 1, drop below to shrink.
const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};
const s = (i: number) => SCALE[i] ?? 1;

// array order = stack order, back (z 2) -> front (z 9)
const CARDS: StackSpreadCard[] = [
  // top-left (digitalGradient)
  {
    item: { src: IMG.digitalGradient, alt: "Digital gradient interface" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -16,
    target: { x: -28, y: -26, rotate: -6, scale: 1.05, w: 23, h: 28 },
    targetSm: { x: -22, y: -38 },
    z: 2,
  },
  // top-right (minimalArchitecture)
  {
    item: { src: IMG.minimalArchitecture, alt: "Minimal spatial architecture" },
    stackOffset: { x: 12, y: -10 },
    stackRotate: 18,
    target: { x: 29, y: -26, rotate: 6, scale: 1.05, w: 24, h: 30 },
    targetSm: { x: 22, y: -38 },
    z: 3,
  },
  // mid-left (hardwareChip)
  {
    item: { src: IMG.hardwareChip, alt: "Next-gen processor hardware" },
    stackOffset: { x: -15, y: 2 },
    stackRotate: -5,
    target: { x: -35, y: 2, rotate: -4, scale: 1.0, w: 23, h: 28 },
    targetSm: { x: -22, y: -18 },
    z: 4,
  },
  // top-center (cyberIntelligence)
  {
    item: { src: IMG.cyberIntelligence, alt: "AI agent neural swarm" },
    stackOffset: { x: 2, y: -12 },
    stackRotate: -2,
    target: { x: 2, y: -30, rotate: 1, scale: 1.08, w: 25, h: 28 },
    targetSm: { x: 22, y: -18 },
    z: 5,
  },
  // mid-right (spatialInterface)
  {
    item: { src: IMG.spatialInterface, alt: "Spatial holographic layer" },
    stackOffset: { x: 16, y: 2 },
    stackRotate: 7,
    target: { x: 35, y: 4, rotate: 5, scale: 1.05, w: 24, h: 30 },
    targetSm: { x: -22, y: 18 },
    z: 6,
  },
  // bottom-left (codeWorkspace)
  {
    item: { src: IMG.codeWorkspace, alt: "Distributed backend terminal" },
    stackOffset: { x: -7, y: 10 },
    stackRotate: 5,
    target: { x: -26, y: 28, rotate: -3, scale: 1.05, w: 24, h: 28 },
    targetSm: { x: 22, y: 18 },
    z: 7,
  },
  // bottom-center (abstractFluid)
  {
    item: { src: IMG.abstractFluid, alt: "Fluid generative canvas" },
    stackOffset: { x: 7, y: 8 },
    stackRotate: 3,
    target: { x: 1, y: 30, rotate: 2, scale: 1.08, w: 25, h: 28 },
    targetSm: { x: -22, y: 38 },
    z: 8,
  },
  // bottom-right (network)
  {
    item: { src: IMG.network, alt: "Cloud infrastructure mesh" },
    stackOffset: { x: 18, y: 12 },
    stackRotate: -7,
    target: { x: 28, y: 27, rotate: -5, scale: 1.0, w: 22, h: 26 },
    targetSm: { x: 22, y: 38 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

// Scroll progress where the cluster starts scattering and where it finishes.
const SCATTER_START = 0.06;
const SCATTER_END = 0.85;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB = "Digital products, interfaces, and experiences built around people.";

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  /** final x/y (vw/vh) for tablet + mobile; falls back to `target` */
  targetSm?: { x: number; y: number };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (vw/vh) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  /** uniform rest-scale for every card; null = use each card's own scale */
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  /** scale of the cards while clustered, before the scatter */
  stackScale: number;
  /** corner radius on each card, in px (desktop) */
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  // final resting spot: column grid on small screens, scatter on desktop
  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  // -50% keeps card centred on its anchor
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
}: {
  item: StackSpreadItem;
  cardRadius: number;
}) {
  return (
    <div
      className="group relative h-full w-full overflow-hidden max-md:rounded-[4vw] bg-slate-950/90 border border-slate-700/80 hover:border-lime-400/70 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(163,230,53,0.2)] transition-all duration-500 backdrop-blur-xl"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter contrast-105 brightness-95"
      />

      {/* Cyber gradient overlay matching background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent pointer-events-none" />

      {/* Cyber Corner Reticles */}
      <div className="absolute top-2.5 left-2.5 font-mono text-[9px] text-lime-400/90 tracking-widest pointer-events-none bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-800/90 backdrop-blur-md">
        SYS // {item.alt?.slice(0, 14).toUpperCase() || 'NODE'}
      </div>
      <div className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-sky-400/80 pointer-events-none bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800">
        [OK:200]
      </div>

      {/* Subtle Inner Glow Border */}
      <div className="absolute inset-0 rounded-[inherit] border border-lime-400/0 group-hover:border-lime-400/30 transition-colors pointer-events-none" />
    </div>
  );
}

interface StackSpreadStageProps {
  cards: StackSpreadCard[];
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
  /** show the "scroll to spread" hint at the bottom until the scatter begins */
  showScrollHint?: boolean;
}

function StackSpreadStage({
  cards,
  scrollLength = 350,
  bgColor = "transparent",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 12,
  textColor = "#ffffff",
  textFadeStart = 0.3,
  showScrollHint = true,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // hold, scatter, then settle
  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  // centre text always fades in on scroll; the scale-in is dropped only when
  // reduced motion is confirmed (`true`), not on the null SSR value.
  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread(p > 0.08);
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);

  // scroll hint: visible while clustered, gone by the time the scatter starts
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      id="stack-spread"
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* centre text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8 select-none"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          <h2
            className="w-full whitespace-pre-line text-[4.5vw] font-bold leading-none tracking-tight max-md:text-[10vw] font-blinker drop-shadow-2xl"
            style={{ color: textColor }}
          >
            Engineering{" "}
            <span className="text-lime-400 opacity-90">
              That
            </span>{" "}
            Performs.
          </h2>
          <p
            className="mt-[1.2vw] w-full max-w-[44ch] text-[1.2vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.8vw] font-outfit"
            style={{ color: textColor, opacity: 0.7 }}
          >
            {SUB}
          </p>
        </motion.div>

        {/* scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* scroll hint with Lucide Icon */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.8vw] font-medium uppercase tracking-[0.2em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw] font-mono text-lime-400"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-xs">Scroll To Spread</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-lime-400" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

export interface StackSpreadProps {
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px (desktop only — mobile keeps its responsive radius) */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
  /** show the "scroll to spread" hint at the bottom until the scatter begins */
  showScrollHint?: boolean;
}

export default function StackSpread({
  scrollLength = 175,
  bgColor = "transparent",
  clusterRotation = true,
  stackScale = 0.85,
  cardRadius = 14,
  textColor = "#ffffff",
  textFadeStart = 0.2,
  showScrollHint = true,
}: StackSpreadProps) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
    />
  );
}
