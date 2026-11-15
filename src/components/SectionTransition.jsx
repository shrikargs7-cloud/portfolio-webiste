import React from 'react';

export default function SectionTransition({ children, className = "", id }) {
  return (
    <div
      id={id}
      className={`w-full py-4 md:py-8 flex flex-col justify-center ${className}`}
    >
      {children}
    </div>
  );
}
