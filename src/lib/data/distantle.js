// Distantle — guess the secret city. Feedback: distance + cardinal direction from your guess.
export const cities = [
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
  { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832 },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Rome', lat: 41.9028, lon: 12.4964 },
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Seoul', lat: 37.5665, lon: 126.9780 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Lagos', lat: 6.5244, lon: 3.3792 },
  { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
  { name: 'Tehran', lat: 35.6892, lon: 51.3890 },
  { name: 'Karachi', lat: 24.8607, lon: 67.0011 },
  { name: 'Lima', lat: -12.0464, lon: -77.0428 },
  { name: 'Bogota', lat: 4.7110, lon: -74.0721 },
  { name: 'Santiago', lat: -33.4489, lon: -70.6693 },
  { name: 'Athens', lat: 37.9838, lon: 23.7275 },
  { name: 'Vienna', lat: 48.2082, lon: 16.3738 },
  { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
  { name: 'Helsinki', lat: 60.1699, lon: 24.9384 },
  { name: 'Reykjavik', lat: 64.1466, lon: -21.9426 },
  { name: 'Auckland', lat: -36.8485, lon: 174.7633 },
  { name: 'Honolulu', lat: 21.3099, lon: -157.8581 },
  { name: 'Anchorage', lat: 61.2181, lon: -149.9003 },
  { name: 'Vladivostok', lat: 43.1198, lon: 131.8869 },
]

export const allCityNames = cities.map(c => c.name)

export function haversineKm(a, b) {
  const R = 6371
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const sa = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2
  return 2 * R * Math.asin(Math.sqrt(sa))
}

export function bearing(from, to) {
  const toRad = d => d * Math.PI / 180
  const toDeg = r => r * 180 / Math.PI
  const φ1 = toRad(from.lat), φ2 = toRad(to.lat)
  const Δλ = toRad(to.lon - from.lon)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

export function bearingArrow(deg) {
  const arrows = ['⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️']
  return arrows[Math.round(deg / 45) % 8]
}
