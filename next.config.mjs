const backendApi = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendApi}/:path*` }];
  },
};

export default nextConfig;
