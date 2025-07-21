import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.dribbble.com', 
      "collect-aws.s3.us-east-1.amazonaws.com"
    ]
  }
};

export default nextConfig;
