import { guides } from '$lib/data/guides.js'

export const prerender = true

const SITE = 'https://daily-le.com'

const gameRoutes = [
  '/reaction', '/blindtap', '/whodunit', '/sportle', '/physicsle',
  '/datele', '/languagle', '/statele', '/elemently', '/capitdle', '/distantle'
]

const staticRoutes = ['/', '/about', '/privacy', '/faq', '/how-to-play']

export function GET() {
  const guideRoutes = Object.keys(guides).map(slug => `/how-to-play/${slug}`)
  const urls = [...staticRoutes, ...gameRoutes, ...guideRoutes]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}${u}</loc>
    <changefreq>${u === '/' || gameRoutes.includes(u) ? 'daily' : 'monthly'}</changefreq>
    <priority>${u === '/' ? '1.0' : gameRoutes.includes(u) ? '0.9' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
