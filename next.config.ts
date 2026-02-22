import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Activa el MCP server en /_next/mcp (Next.js 16+)
  experimental: {
    mcpServer: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'agente7.cl',
          },
        ],
        destination: 'https://agentboss.cl/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.agente7.cl',
          },
        ],
        destination: 'https://agentboss.cl/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'agente007.cl',
          },
        ],
        destination: 'https://agentboss.cl/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.agente007.cl',
          },
        ],
        destination: 'https://agentboss.cl/:path*',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
