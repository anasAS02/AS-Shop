/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.dummyjson.com', 'localhost'],   
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
