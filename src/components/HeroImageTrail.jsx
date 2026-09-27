import React, { useState, useRef } from 'react';
import { ArrowDown, Sparkles, Video, Play, Pause, Zap } from 'lucide-react';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';
import DancingLetters from './ui/dancing-letters';

export default function HeroImageTrail({ setCursorState, images }) {
  const [trailItems, setTrailItems] = useState([]);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(2.2); // Fast dynamic video motion
  const lastPosRef = useRef({ x: 0, y: 0 });
  const imageIndexRef = useRef(0);

  const sampleImages = [
    images.aiLearn,
    images.health,
    images.crypto,
    images.nook,
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 75) {
      lastPosRef.current = { x, y };

      const imgUrl = sampleImages[imageIndexRef.current % sampleImages.length];
      imageIndexRef.current += 1;

      const newItem = {
        id: Date.now() + Math.random(),
        x,
        y,
        imgUrl,
        rotation: (Math.random() - 0.5) * 20,
      };

      setTrailItems((prev) => [...prev.slice(-12), newItem]);
    }
  };

  const cycleSpeed = () => {
    if (speedMultiplier === 1.5) setSpeedMultiplier(2.2);
    else if (speedMultiplier === 2.2) setSpeedMultiplier(3.0);
    else setSpeedMultiplier(1.5);
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 text-center select-none bg-transparent"
    >
      {/* Background Video - View 01: Liquid Ambient */}
      {videoPlaying && (
        <BackgroundVideo
          src={VIDEO_SOURCES.hero}
          transform="scale-110"
          opacity="opacity-40"
          blendMode="mix-blend-screen"
          overlayColor="bg-transparent/55"
          playbackRate={speedMultiplier}
        />
      )}

      {/* Video View Badge & Speed Controls */}
      <div className="absolute top-28 left-6 z-30 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-[#FFFFFF]/70 border border-white/15 backdrop-blur-md font-mono text-[11px] text-[#2B231D]/90 shadow-2xl">
        <Video className="w-4 h-4 text-accent animate-pulse" />
        <span>View 01: Fast Ambient Motion ({speedMultiplier}x Speed)</span>
        
        <button
          type="button"
          onClick={cycleSpeed}
          className="px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold hover:bg-accent hover:text-black transition-colors flex items-center gap-1"
        >
          <Zap className="w-3 h-3" /> {speedMultiplier}x
        </button>

        <button
          type="button"
          onClick={() => setVideoPlaying(!videoPlaying)}
          className="text-[#2B231D]/60 hover:text-accent flex items-center gap-1 ml-1"
        >
          {videoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>

      {/* Render Active Mouse Trail Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {trailItems.map((item) => (
          <div
            key={item.id}
            className="trail-card w-44 h-28 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            }}
          >
            <img src={item.imgUrl} alt="Project trail preview" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Hero Central Content */}
      <div 
        className="relative z-20 flex flex-col items-center max-w-5xl mx-auto"
        onMouseEnter={() => setCursorState({ label: 'Vibe Code' })}
        onMouseLeave={() => setCursorState({ label: null })}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2B231D]/10 bg-white/5 backdrop-blur-md mb-8">
          <Sparkles className="w-4 h-4 text-accent animate-spin" />
          <span className="text-xs font-mono text-[#2B231D]/80 tracking-widest">Creative Technologist &amp; Product Designer</span>
        </div>

        <h1 className="relative z-20">
          <DancingLetters
            text="Shrikar GS"
            className="font-google justify-center"
            letterClassName="font-google text-[clamp(44px,9vw,130px)] font-bold leading-[0.88] tracking-tight text-[#2B231D] drop-shadow-2xl hover:text-accent transition-colors"
          />
        </h1>

        <p className="font-sulphur mt-10 max-w-2xl text-[clamp(17px,2vw,24px)] leading-relaxed tracking-tight text-[#2B231D]/90 font-light drop-shadow">
          New York based product designer who loves beautiful things and blends creativity, technology, and a little vibe-coding into every build.
        </p>

        {/* Quick Tag Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 font-google text-xs font-medium text-[#2B231D]/70">
          <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-[#FFFFFF]/40 backdrop-blur-md">Spatial Interfaces</span>
          <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-[#FFFFFF]/40 backdrop-blur-md">AI Agent Systems</span>
          <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-[#FFFFFF]/40 backdrop-blur-md">Brand Architecture</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 z-20">
        <span className="font-google text-[11px] tracking-[0.35em] text-[#2B231D]/50 font-semibold">Scroll</span>
        <div className="relative block h-10 w-[1px] overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 block h-4 w-full bg-accent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
