const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

export async function handle({ event, resolve }) {
  const response = await resolve(event)
  for (const [name, value] of Object.entries(securityHeaders)) {
    response.headers.set(name, value)
  }
  return response
}
