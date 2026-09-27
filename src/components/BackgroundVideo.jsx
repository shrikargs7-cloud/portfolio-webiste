import React, { useEffect, useRef } from 'react';

export const VIDEO_SOURCES = {
  hero: 'https://cdn.pixabay.com/video/2022/10/24/136254-763953798_large.mp4',
  about: 'https://cdn.pixabay.com/video/2020/09/20/50498-462117565_large.mp4',
  work: 'https://cdn.pixabay.com/video/2021/04/12/70877-536413289_large.mp4',
  playground: 'https://cdn.pixabay.com/video/2020/05/25/40232-424756578_large.mp4',
  web: 'https://cdn.pixabay.com/video/2022/11/07/138138-768522339_large.mp4',
  performance: 'https://cdn.pixabay.com/video/2021/09/15/88636-608493188_large.mp4',
  vibe: 'https://cdn.pixabay.com/video/2020/04/17/36184-409163273_large.mp4',
};

export default function BackgroundVideo({ 
  src, 
  transform = 'scale-100', 
  opacity = 'opacity-25', 
  blendMode = 'mix-blend-screen',
  overlayColor = 'bg-[#FFFFFF]/60',
  playbackRate = 2.0
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover transition-all duration-1000 ${transform} ${opacity} ${blendMode} filter blur-[0.5px] scale-105`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlayColor} pointer-events-none`} />
    </div>
  );
}