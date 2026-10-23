import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> ./out, served by Cloudflare Pages
  output: "export",
  // Keep production builds from replacing artifacts used by a running dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: process.cwd(),
  // No Next image server on a static host
  images: { unoptimized: true },
  // /projects/foo/ -> projects/foo/index.html (clean URLs on Pages)
  trailingSlash: true,
};

export default nextConfig;
