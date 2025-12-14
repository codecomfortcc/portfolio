/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        // You can also add "api.uploadthing.com" if needed, 
        // but "utfs.io" is the main one for file delivery now.
      },
    ],
  },};

export default nextConfig;
