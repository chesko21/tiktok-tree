/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "p16-sign-sg.tiktokcdn.com",
        },
        {
          protocol: "https",
          hostname: "p16-sign-va.tiktokcdn.com",
        },
        {
          protocol: "https",
          hostname: "p16-amd-va.tiktokcdn.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  