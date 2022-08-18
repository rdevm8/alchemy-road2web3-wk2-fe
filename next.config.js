/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    env: {
        chainId: "0x5",
        targetAmt: 0.1,
    },
}

module.exports = nextConfig
