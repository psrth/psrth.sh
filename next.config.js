/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/wa",
        destination: "https://api.whatsapp.com/send?phone=919910231328",
        permanent: true,
      },
      {
        source: "/spotify",
        destination: "https://open.spotify.com/user/parthsharma_151",
        permanent: true,
      },
      {
        source: "/gm",
        destination: "https://i.imgur.com/QrQngFQ.png",
        permanent: true,
      },
    ];
  },
};
