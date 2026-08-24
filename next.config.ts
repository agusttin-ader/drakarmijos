import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Badges y logo se renderizan entre 40px y 80px; los retratos y fotos
    // clínicas hasta ~840px de ancho servido.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [75, 90],
  },
};

export default nextConfig;
