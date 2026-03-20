import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const sharedConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 20, 24, 32, 48, 64, 96, 112, 128, 256, 384],
  },
};

const nextConfig = (phase: string): NextConfig => {
  const exportFolderPath = phase === PHASE_DEVELOPMENT_SERVER ? "dev" : "docs";

  return {
    ...sharedConfig,
    distDir: exportFolderPath,
    transpilePackages: ["next-image-export-optimizer"],
    env: {
      nextImageExportOptimizer_imageFolderPath: "public",
      nextImageExportOptimizer_exportFolderPath: exportFolderPath,
      nextImageExportOptimizer_quality: "75",
      nextImageExportOptimizer_storePicturesInWEBP: "true",
      nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
      nextImageExportOptimizer_generateAndUseBlurImages: "true",
      nextImageExportOptimizer_remoteImageCacheTTL: "0",
    },
  };
};

export default nextConfig;
