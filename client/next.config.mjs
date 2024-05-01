/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    compilerOptions: {
      styledComponents: true,
    }
};

export default nextConfig;
