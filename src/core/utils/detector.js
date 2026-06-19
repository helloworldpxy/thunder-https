const PROTOCOL_MAP = {
  'thunder://': 'thunder',
  'qqdl://': 'qqdl',
  'flashget://': 'flashget',
  'ed2k://': 'ed2k',
  'magnet:?': 'magnet'
}

export function detectProtocol (url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim().toLowerCase()
  for (const [prefix, protocol] of Object.entries(PROTOCOL_MAP)) {
    if (trimmed.startsWith(prefix)) return protocol
  }
  return null
}

export function cleanUrl (url) {
  if (!url || typeof url !== 'string') return ''
  return url.trim().replace(/^[\s]+|[\s]+$/g, '')
}

export function isValidBase64 (str) {
  if (!str || typeof str !== 'string') return false
  if (str.length % 4 !== 0) return false
  return /^[A-Za-z0-9+/=]+$/.test(str)
}

export function fixBase64Padding (str) {
  if (!str || typeof str !== 'string') return str
  const paddingNeeded = (4 - (str.length % 4)) % 4
  return str + '='.repeat(paddingNeeded)
}
