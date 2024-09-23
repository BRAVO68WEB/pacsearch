/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/*",
            },
            {
                protocol: "https",
                hostname: "pacsearch-assets.b68.dev",
                port: "",
                pathname: "/*",
            },
        ],
    },
};

export default nextConfig;
