import SphereImageGrid, { ImageData } from "@/components/ui/img-sphere";
import React from 'react';

// ==========================================
// EASY CONFIGURATION - Edit these values to customize the component
// ==========================================

// Image data using project assets - duplicated to fill sphere better
const BASE_IMAGES: Omit<ImageData, 'id'>[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/0d/0d2e0b21e20ae2110e094d1c518513cb1ed1132a7cc4198130561cebb91aef07.jpg",
    alt: "Image 1",
    title: "Mountain Landscape",
    description: "A beautiful landscape captured at golden hour with mountains in the background."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/45/45f94f8dc98cea6ae0070f89d21468db7cf9dd3ff64ded6b1fa0c388b000d068.jpg",
    alt: "Image 2",
    title: "Portrait Photography",
    description: "Stunning portrait photography showcasing natural lighting and composition."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/cc/ccb0e1d128f6768a0d7888018876c98a78acf8c553834b052087982c70612990.jpg",
    alt: "Image 3",
    title: "Urban Architecture",
    description: "Modern architectural design featuring clean lines and geometric patterns."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/89/89d2ce071dd63080e77f88174b076d68fcbfdfcfa0e3840d46c28af1dce25572.jpg",
    alt: "Image 4",
    title: "Nature Scene",
    description: "Peaceful nature scene with vibrant colors and natural beauty."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/0e/0e39abe2e9269683a3c150dffd47937391ac95c0d219c9c541788ecb00f97b86.jpg",
    alt: "Image 5",
    title: "Abstract Art",
    description: "Creative abstract composition with bold colors and unique patterns."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/3f/3f29fec6546170bbba208f21925448b3e0c4f8e0e10517afd35286c46694a556.jpg",
    alt: "Image 6",
    title: "Mountain Landscape",
    description: "A beautiful landscape captured at golden hour with mountains in the background."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/a7/a7331b043fd8c158732f1eaafdfa0cdf9711255a46a3470002138d9d83c2fcc2.jpg",
    alt: "Image 7",
    title: "Portrait Photography",
    description: "Stunning portrait photography showcasing natural lighting and composition."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/ce/cea6e287008d0c7cdffc2a93070ad99a3ca9cef2d26fa179727715b6d2f87f54.jpg",
    alt: "Image 8",
    title: "Urban Architecture",
    description: "Modern architectural design featuring clean lines and geometric patterns."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/f0/f014d32aa5b2f6d54a82fc49509c88445081cb6a4d33fbfd9837dab3d00cbe02.jpg",
    alt: "Image 9",
    title: "Nature Scene",
    description: "Peaceful nature scene with vibrant colors and natural beauty."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/03/03a391313ea9a2bdc090eb88dea5839633ef056e452e1de50dcd1aeca05c8ae4.jpg",
    alt: "Image 10",
    title: "Abstract Art",
    description: "Creative abstract composition with bold colors and unique patterns."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/72/727c9683874de466ed4c8be5195541ec7100605d440e80ebee23c16c8aaac169.jpg",
    alt: "Image 11",
    title: "Abstract Art",
    description: "Creative abstract composition with bold colors and unique patterns."
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/4e/4e093402d1e552f61e11b7d4d0ba96ce452aa4f9b1e47f78e679dbd05b54db95.jpg",
    alt: "Image 12",
    title: "Abstract Art",
    description: "Creative abstract composition with bold colors and unique patterns."
  }
];

// Generate more images by repeating the base set
const IMAGES: ImageData[] = [];
for (let i = 0; i < 60; i++) {
  const baseIndex = i % BASE_IMAGES.length;
  const baseImage = BASE_IMAGES[baseIndex];
  IMAGES.push({
    id: `img-${i + 1}`,
    ...baseImage,
    alt: `${baseImage.alt} (${Math.floor(i / BASE_IMAGES.length) + 1})`
  });
}

// Component configuration - easily adjustable
interface SphereConfig {
  containerSize: number;
  sphereRadius: number;
  dragSensitivity: number;
  momentumDecay: number;
  maxRotationSpeed: number;
  baseImageScale: number;
  hoverScale: number;
  perspective: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

const CONFIG: SphereConfig = {
  containerSize: 600,          // Container size in pixels
  sphereRadius: 200,           // Virtual sphere radius (increased for better spacing)
  dragSensitivity: 0.8,        // Mouse drag sensitivity (0.1 - 2.0)
  momentumDecay: 0.96,         // How fast momentum fades (0.8 - 0.99)
  maxRotationSpeed: 6,         // Maximum rotation speed (1 - 10)
  baseImageScale: 0.15,        // Base image size (reduced to minimize overlap)
  hoverScale: 1.3,             // Hover scale multiplier (1.0 - 2.0)
  perspective: 1000,           // CSS perspective value (500 - 2000)
  autoRotate: true,            // Enable/disable auto rotation
  autoRotateSpeed: 0.2         // Auto rotation speed (0.1 - 2.0, higher = faster)
};

export default function DemoOne() {
  return (
    <main className="w-full p-6 flex justify-center items-center min-h-screen">
      <SphereImageGrid
        images={IMAGES}
        {...CONFIG}
      />
    </main>
  );
}
