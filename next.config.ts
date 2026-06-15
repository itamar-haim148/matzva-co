import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone build for small, self-contained Docker images (Coolify).
  output: "standalone",
};

export default nextConfig;
