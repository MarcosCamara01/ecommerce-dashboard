/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'files.stripe.com',
                pathname: '**',
            },
        ],
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/orders',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
