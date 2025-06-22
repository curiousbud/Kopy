/**
 * @type {import('next').NextConfig}
 *
 * This is the configuration file for Next.js.
 * It allows you to customize the behavior of your Next.js application.
 *
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

// We import the necessary types from the 'next' package to ensure type safety.
import pkg from 'next';
const { NextConfig } = pkg;

const nextConfig = {
  /**
   * TypeScript configuration options.
   * We are ignoring build errors here, which can be useful during development,
   * but it's recommended to set this to `false` for production builds to catch type errors.
   */
  typescript: {
    ignoreBuildErrors: true,
  },

  /**
   * ESLint configuration options.
   * We are ignoring ESLint during builds. This can speed up the build process,
   * but it means linting errors won't fail the build. It's often better to
   * run `npm run lint` as a separate step in your CI/CD pipeline.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * Image optimization configuration.
   * This section allows you to define a list of allowed external domains for `next/image`.
   * This is a security feature to prevent your application from serving images from untrusted sources.
   *
   * @see https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // When using an authentication provider like Google, their user profile images
      // are often hosted on specific domains. You might need to add those domains here.
      // For Google, this is typically 'lh3.googleusercontent.com'.
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
