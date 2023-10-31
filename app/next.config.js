module.exports = async (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        /* config options here */
        compress: false,
        env: {
            title: '小红书'
        },
        async redirects() {
            return [
                {
                    source: '/',
                    destination: '/explore',
                    permanent: true
                }
            ]
        }
    }
    return nextConfig
}