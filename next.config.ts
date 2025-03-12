import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: [
      "lh3.googleusercontent.com", // Dominio de imágenes de Google
      "seba-anto.s3.us-east-1.amazonaws.com", // Dominio de tu bucket S3
    ],
  },
};

export default nextConfig;
