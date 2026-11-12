import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages static deployment — the whole site is client-side,
  // so we export pure static HTML/JS/CSS into ./out
  output: "export",
  images: {
    // no Next image-optimization server on a static host — serve the
    // source files directly (they are already optimized JPEGs)
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
