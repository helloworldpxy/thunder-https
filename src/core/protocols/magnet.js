export function parseMagnet (url) {
  try {
    if (!url.toLowerCase().startsWith('magnet:?')) return { success: false, error: '不是有效的磁力链接' }

    const params = {}
    const queryString = url.split('?')[1] || ''
    for (const pair of queryString.split('&')) {
      const [key, value] = pair.split('=')
      if (key) {
        const decodedKey = decodeURIComponent(key)
        const decodedValue = value ? decodeURIComponent(value) : ''
        if (params[decodedKey]) {
          if (!Array.isArray(params[decodedKey])) params[decodedKey] = [params[decodedKey]]
          params[decodedKey].push(decodedValue)
        } else { params[decodedKey] = decodedValue }
      }
    }

    const xt = params['xt']
    if (!xt) return { success: false, error: '缺少必需的 xt 参数' }

    let hash = '', hashType = ''
    if (xt.startsWith('urn:btih:')) { hash = xt.replace('urn:btih:', ''); hashType = 'btih' }
    else if (xt.startsWith('urn:btmh:')) { hash = xt.replace('urn:btmh:', ''); hashType = 'btmh' }
    else return { success: false, error: `不支持的 xt 类型: ${xt}` }

    if (hashType === 'btih') {
      if (!/^[A-Fa-f0-9]{40}$/.test(hash) && !/^[A-Za-z2-7]{32}$/.test(hash)) {
        return { success: false, error: '无效的 BTIH 哈希格式' }
      }
    }

    return {
      success: true, decodedUrl: url,
      metadata: {
        hash, hashType,
        name: params['dn'] || '',
        trackers: Array.isArray(params['tr']) ? params['tr'] : (params['tr'] ? [params['tr']] : [])
      }
    }
  } catch (error) { return { success: false, error: `解析异常: ${error.message}` } }
}

export function buildMagnet ({ hash, name = '', trackers = [] }) {
  let url = `magnet:?xt=urn:btih:${hash}`
  if (name) url += `&dn=${encodeURIComponent(name)}`
  for (const tracker of trackers) url += `&tr=${encodeURIComponent(tracker)}`
  return url
}

export function hashToMagnet (hash) {
  return `magnet:?xt=urn:btih:${hash}`
}
