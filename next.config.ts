import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Dominio de imágenes de Google
      },
      {
        protocol: "https",
        hostname: "seba-anto.s3.us-east-1.amazonaws.com", // Dominio de tu bucket S3
        pathname: "/**", // Permite todas las rutas dentro del bucket
      },
    ],
  },
};

export default nextConfig;