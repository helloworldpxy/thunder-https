import { base64DecodeUTF8 } from '../utils/base64.js'
import { urlDecode } from '../utils/urlCodec.js'

export function decodeThunder (url) {
  try {
    const encoded = url.replace(/^thunder:\/\//i, '')
    if (!encoded) return { success: false, error: '链接内容为空' }

    let decoded
    try { decoded = base64DecodeUTF8(encoded) }
    catch (error) { return { success: false, error: `Base64 解码失败: ${error.message}` } }

    if (!decoded.startsWith('AA') || !decoded.endsWith('ZZ')) {
      if (decoded.startsWith('http://') || decoded.startsWith('https://') || decoded.startsWith('ed2k://') || decoded.startsWith('magnet:?')) {
        return { success: true, decodedUrl: decoded }
      }
      return { success: false, error: '无效的迅雷链接格式：缺少 AA/ZZ 标记' }
    }

    const innerUrl = decoded.slice(2, -2)
    const finalUrl = urlDecode(innerUrl)

    if (!finalUrl || (!finalUrl.startsWith('http') && !finalUrl.startsWith('ed2k') && !finalUrl.startsWith('magnet'))) {
      return { success: false, error: '解码后的 URL 格式无效' }
    }

    return { success: true, decodedUrl: finalUrl }
  } catch (error) { return { success: false, error: `解码异常: ${error.message}` } }
}

export function encodeThunder (url) {
  const wrapped = 'AA' + encodeURIComponent(url) + 'ZZ'
  return 'thunder://' + btoa(wrapped)
}
