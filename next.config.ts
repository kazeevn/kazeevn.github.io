import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const sharedConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

const nextConfig = (phase: string): NextConfig => ({
  ...sharedConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? 'dev' : 'docs',
});

export default nextConfig;
