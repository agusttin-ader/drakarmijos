import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Sin Image Optimization de Vercel/Next: servimos archivos estáticos
    // ya optimizados en /public (rápido + alta calidad en cualquier host).
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/otorrino-buenos-aires",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ronquidos",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apnea-del-sueno",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
