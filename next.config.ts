import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Formats d'image modernes : plus légers, donc affichage plus rapide (LCP).
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
