import { guides } from '$lib/data/guides.js'
import { error } from '@sveltejs/kit'

export const prerender = true

export function entries() {
  return Object.keys(guides).map(game => ({ game }))
}

export function load({ params }) {
  const guide = guides[params.game]
  if (!guide) throw error(404, 'Guide not found')
  return { slug: params.game, guide }
}
