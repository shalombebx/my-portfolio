import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> ./out, served by Cloudflare Pages
  output: "export",
  outputFileTracingRoot: process.cwd(),
  // No Next image server on a static host
  images: { unoptimized: true },
  // /projects/foo/ -> projects/foo/index.html (clean URLs on Pages)
  trailingSlash: true,
};

export default nextConfig;
