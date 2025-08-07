import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Add 'localhost' to the list of allowed domains
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
