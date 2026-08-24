import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Sin Image Optimization de Vercel/Next: servimos archivos estáticos
    // ya optimizados en /public (rápido + alta calidad en cualquier host).
    unoptimized: true,
  },
};

export default nextConfig;
