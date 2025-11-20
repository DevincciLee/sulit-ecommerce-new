import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://ftxcllybstezpnwabxsf.supabase.co/storage/v1/object/public/product-images/**"
      ),
    ],
  },
};

export default nextConfig;
