import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Avoids dev-only "SegmentViewNode" / client manifest errors with Next 15 devtools.
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
