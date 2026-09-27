"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowLeft, Link, Zap, CheckCircle2, Clock, AlertCircle, Play, Pause, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number>(timelineData[0]?.id ?? 1);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const autoRotateRef = useRef<boolean>(autoRotate);
  const isVisibleRef = useRef<boolean>(isVisible);

  autoRotateRef.current = autoRotate;
  isVisibleRef.current = isVisible;

  // Shortest angular difference between two angles in degrees (-180 to +180)
  const shortestAngleDiff = (target: number, current: number): number => {
    let diff = (target - current) % 360;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    return diff;
  };

  // Only animate when visible in viewport to prevent background CPU/GPU lag
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Butter-smooth hardware-driven rotation using requestAnimationFrame WITHOUT React state churn
  // Directly updates DOM node transforms, eliminating 60fps re-render thrashing and flickering
  useEffect(() => {
    let lastTime = performance.now();
    const total = timelineData.length;

    const updateNodes = (angle: number) => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;
      const radius = isMobile ? 120 : isTablet ? 155 : 185;

      for (let i = 0; i < total; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;

        const nodeAngle = ((i / total) * 360 + angle) % 360;
        const radian = (nodeAngle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const depthFactor = (1 + Math.sin(radian)) / 2;
        const scale = 0.88 + 0.22 * depthFactor;
        const opacity = 0.7 + 0.3 * depthFactor;

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = `${opacity.toFixed(2)}`;
      }
    };

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isVisibleRef.current) {
        if (targetAngleRef.current !== null) {
          const diff = shortestAngleDiff(targetAngleRef.current, angleRef.current);
          angleRef.current += diff * 0.09;
          if (Math.abs(diff) < 0.2) {
            angleRef.current = targetAngleRef.current;
            targetAngleRef.current = null;
          }
          updateNodes(angleRef.current);
        } else if (autoRotateRef.current) {
          angleRef.current = (angleRef.current + 10 * delta) % 360;
          updateNodes(angleRef.current);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // Initial position
    updateNodes(angleRef.current);
    rafRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafRef.current);
  }, [timelineData.length]);

  // Center the view on a specific milestone node
  const centerViewOnNode = useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    // Calculate node's native angular position on the ring
    const nodeNativeAngle = (nodeIndex / totalNodes) * 360;
    // Target 90° (front apex)
    const desiredRotation = 90 - nodeNativeAngle;
    targetAngleRef.current = (desiredRotation % 360 + 360) % 360;
  }, [timelineData]);

  const selectNode = (id: number) => {
    setActiveNodeId(id);
    setAutoRotate(false);
    centerViewOnNode(id);
  };

  const handleNext = () => {
    const currentIndex = timelineData.findIndex((i) => i.id === activeNodeId);
    const nextIndex = (currentIndex + 1) % timelineData.length;
    selectNode(timelineData[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = timelineData.findIndex((i) => i.id === activeNodeId);
    const prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length;
    selectNode(timelineData[prevIndex].id);
  };

  const activeItem = timelineData.find((item) => item.id === activeNodeId) || timelineData[0];
  const ActiveIcon = activeItem.icon;

  const getStatusBadge = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return {
          label: "COMPLETED",
          badgeClass: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-mono",
          icon: <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400 inline" />,
        };
      case "in-progress":
        return {
          label: "IN PROGRESS",
          badgeClass: "bg-lime-400/15 border-lime-400/40 text-lime-400 font-mono",
          icon: <Clock className="w-3 h-3 mr-1 text-lime-400 inline" />,
        };
      case "pending":
      default:
        return {
          label: "FUTURE HORIZON",
          badgeClass: "bg-sky-400/15 border-sky-400/40 text-sky-400 font-mono",
          icon: <AlertCircle className="w-3 h-3 mr-1 text-sky-400 inline" />,
        };
    }
  };

  const statusInfo = getStatusBadge(activeItem.status);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full flex flex-col items-center justify-center bg-transparent select-none relative p-4 sm:p-6",
        className
      )}
    >
      {/* Top Toolbar: Play/Pause, Reset, and Navigation Steppers */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-6 z-20">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`h-8 px-3 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              autoRotate
                ? "border-lime-400/50 bg-lime-400/10 text-lime-400"
                : "border-[#2B231D]/5 bg-[#FFFFFF] text-[#73675E] hover:text-[#2B231D]"
            }`}
          >
            {autoRotate ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoRotate ? "Orbiting" : "Paused"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              targetAngleRef.current = 0;
              setAutoRotate(true);
            }}
            className="h-8 px-2.5 rounded-xl border border-[#2B231D]/5 bg-[#FFFFFF] text-[#73675E] hover:text-[#2B231D] text-xs font-mono"
            title="Reset Orbit"
          >
            <RotateCcw size={12} />
          </Button>
        </div>

        {/* Milestone Stepper */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            className="h-8 px-2.5 rounded-xl border border-[#2B231D]/5 bg-[#FFFFFF] hover:bg-[#F5F1EB] text-[#2B231D] text-xs font-mono flex items-center gap-1"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          <span className="font-mono text-xs text-lime-400 bg-[#FFFFFF]/90 border border-[#2B231D]/5 px-3 py-1 rounded-xl">
            {timelineData.findIndex((i) => i.id === activeNodeId) + 1} / {timelineData.length}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="h-8 px-2.5 rounded-xl border border-[#2B231D]/5 bg-[#FFFFFF] hover:bg-[#F5F1EB] text-[#2B231D] text-xs font-mono flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight size={12} />
          </Button>
        </div>
      </div>

      {/* Main Two-Column / Split Stage: Left Orbital Wheel, Right Active Detail Deck */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center relative">
        
        {/* LEFT/CENTER: 3D Orbital Radar System */}
        <div className="lg:col-span-6 w-full h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center relative overflow-visible">
          {/* Orbital Background Glow */}
          <div className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-lime-400/5 blur-3xl pointer-events-none" />

          {/* Central Reactor Core */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 via-sky-500 to-purple-500 flex items-center justify-center z-20 shadow-[0_0_35px_rgba(163,230,53,0.4)]">
            <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-white/40 flex items-center justify-center text-lime-400">
              <ActiveIcon size={16} />
            </div>
          </div>

          {/* Primary Orbital Guide Ring */}
          <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] md:w-[370px] md:h-[370px] rounded-full border border-[#2B231D]/5 shadow-[0_0_40px_rgba(163,230,53,0.06)] pointer-events-none" />
          
          {/* Outer Secondary Ambient Ring */}
          <div className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] md:w-[440px] md:h-[440px] rounded-full border border-[#2B231D]/5/40 border-dashed pointer-events-none" />

          {/* Planetary Milestone Nodes (Hardware Accelerated, Stable Z-Index, Zero Flicker) */}
          {timelineData.map((item, index) => {
            const isActive = activeNodeId === item.id;
            const isRelated = activeItem.relatedIds.includes(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[index] = el)}
                className={`absolute cursor-pointer will-change-transform flex flex-col items-center justify-center ${
                  isActive ? "z-30" : "z-10"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode(item.id);
                }}
              >
                {/* Energy Glow Ring */}
                <div
                  className={cn(
                    "absolute rounded-full pointer-events-none transition-opacity duration-300",
                    isActive ? "opacity-100 scale-125" : "opacity-40"
                  )}
                  style={{
                    background: `radial-gradient(circle, rgba(163,230,53,0.3) 0%, rgba(163,230,53,0) 70%)`,
                    width: `${Math.max(item.energy * 0.45 + 30, 50)}px`,
                    height: `${Math.max(item.energy * 0.45 + 30, 50)}px`,
                  }}
                />

                {/* Node Orb Button */}
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center shadow-xl border-2 transition-transform duration-200",
                    isActive
                      ? "bg-lime-400 text-slate-950 border-white shadow-[0_0_25px_rgba(163,230,53,0.9)] scale-115"
                      : isRelated
                      ? "bg-sky-400 text-slate-950 border-white shadow-[0_0_20px_rgba(56,189,248,0.7)]"
                      : "bg-[#FFFFFF] text-[#2B231D] border-[#2B231D]/5 hover:border-lime-400 hover:text-lime-400 hover:scale-110"
                  )}
                  title={`${item.title} (${item.date})`}
                >
                  <Icon size={18} />
                </div>

                {/* Micro Node Title Badge */}
                <div
                  className={cn(
                    "mt-2 whitespace-nowrap text-center pointer-events-none",
                    isActive
                      ? "text-lime-400 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
                      : "text-[#73675E] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  )}
                >
                  <span className="font-blinker text-[11px] sm:text-xs tracking-tight bg-[#FFFFFF]/90 px-2.5 py-0.5 rounded-full border border-[#2B231D]/5 shadow-md">
                    {item.title.split("(")[0].trim()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Dedicated High-Clarity Milestone Detail Deck */}
        <div className="lg:col-span-6 w-full z-20">
          <Card className="w-full bg-[#FFFFFF]/90 backdrop-blur-2xl border border-lime-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-visible text-left rounded-3xl">
            <CardHeader className="p-5 sm:p-6 pb-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <Badge variant="outline" className={cn("px-3 py-1 text-xs font-semibold", statusInfo.badgeClass)}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </Badge>

                <span className="text-xs font-mono font-bold text-lime-400 bg-[#FFFFFF]/90 px-3 py-1 rounded-xl border border-[#2B231D]/5">
                  {activeItem.date}
                </span>
              </div>

              <div className="font-mono text-xs text-sky-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                <Zap size={12} className="text-lime-400" />
                <span>{activeItem.category}</span>
              </div>

              <CardTitle className="text-xl sm:text-2xl font-bold font-blinker text-[#2B231D] mt-1 leading-snug">
                {activeItem.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 pt-0 space-y-5 text-sm text-[#73675E] leading-relaxed font-outfit">
              <p className="text-[#2B231D] text-sm sm:text-base leading-relaxed">
                {activeItem.content}
              </p>

              {/* Energy / Progress Bar */}
              <div className="pt-3 border-t border-[#2B231D]/5">
                <div className="flex justify-between items-center text-xs mb-2 font-mono">
                  <span className="flex items-center text-[#73675E]">
                    <Zap size={13} className="mr-1.5 text-lime-400" />
                    Target Progress &amp; Commitment
                  </span>
                  <span className="font-bold text-lime-400">{activeItem.energy}%</span>
                </div>
                <div className="w-full h-2 bg-[#F5F1EB]/90 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-lime-400 via-sky-400 to-purple-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(163,230,53,0.5)]"
                    style={{ width: `${activeItem.energy}%` }}
                  />
                </div>
              </div>

              {/* Connected Milestone Tracks */}
              {activeItem.relatedIds.length > 0 && (
                <div className="pt-3 border-t border-[#2B231D]/5">
                  <div className="flex items-center mb-2.5">
                    <Link size={13} className="text-sky-400 mr-1.5" />
                    <h4 className="text-xs uppercase tracking-wider font-mono font-semibold text-[#73675E]">
                      Connected Horizons &amp; Tracks
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.relatedIds.map((relatedId) => {
                      const relatedItem = timelineData.find((i) => i.id === relatedId);
                      if (!relatedItem) return null;
                      return (
                        <Button
                          key={relatedId}
                          variant="outline"
                          size="sm"
                          className="flex items-center h-7 px-3 text-xs rounded-xl border-[#2B231D]/5 bg-[#FFFFFF]/90 hover:bg-lime-400 hover:text-slate-950 text-[#2B231D] transition-all font-mono shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectNode(relatedId);
                          }}
                        >
                          <span>{relatedItem.title.split("(")[0].trim()}</span>
                          <ArrowRight size={11} className="ml-1.5" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Quick Select Buttons Grid Below Orbit */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mt-8 z-20">
        {timelineData.map((item) => {
          const Icon = item.icon;
          const isActive = activeNodeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectNode(item.id)}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3",
                isActive
                  ? "bg-[#FFFFFF]/90 border-lime-400/60 shadow-[0_0_20px_rgba(163,230,53,0.2)]"
                  : "bg-[#FFFFFF]/60 border-[#2B231D]/5 hover:border-[#2B231D]/5 hover:bg-[#FFFFFF]/40"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl border flex-shrink-0 transition-colors",
                  isActive
                    ? "bg-lime-400 text-slate-950 border-lime-400"
                    : "bg-[#FFFFFF] text-[#73675E] border-[#2B231D]/5"
                )}
              >
                <Icon size={14} />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] text-lime-400/90 font-bold block truncate uppercase">
                  {item.date}
                </span>
                <div className="font-blinker text-xs font-bold text-[#2B231D] truncate">
                  {item.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
