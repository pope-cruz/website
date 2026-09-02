import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="pope-cruz-resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
