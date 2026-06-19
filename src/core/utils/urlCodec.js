export function urlDecode (encoded) {
  try { return decodeURIComponent(encoded) }
  catch (error) { throw new Error(`URL 解码失败: ${error.message}`) }
}

export function urlEncode (str) {
  try { return encodeURIComponent(str) }
  catch (error) { throw new Error(`URL 编码失败: ${error.message}`) }
}

export function safeUrlDecode (encoded) {
  let decoded = encoded
  let previous = ''
  while (decoded !== previous) {
    previous = decoded
    try { decoded = decodeURIComponent(decoded) }
    catch (error) { break }
  }
  return decoded
}

export function parseUrlParams (url) {
  try {
    const urlObj = new URL(url)
    const params = {}
    for (const [key, value] of urlObj.searchParams) params[key] = value
    return params
  } catch (error) {
    const queryString = url.split('?')[1] || ''
    const params = {}
    for (const pair of queryString.split('&')) {
      const [key, value] = pair.split('=')
      if (key) params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ''
    }
    return params
  }
}
