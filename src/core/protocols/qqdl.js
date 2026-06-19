import { base64DecodeUTF8 } from '../utils/base64.js'
import { urlDecode } from '../utils/urlCodec.js'

export function decodeQqdl (url) {
  try {
    const encoded = url.replace(/^qqdl:\/\//i, '')
    if (!encoded) return { success: false, error: '链接内容为空' }

    let decoded
    try { decoded = base64DecodeUTF8(encoded) }
    catch (error) { return { success: false, error: `Base64 解码失败: ${error.message}` } }

    let finalUrl
    try { finalUrl = urlDecode(decoded) }
    catch (error) { finalUrl = decoded }

    if (!finalUrl || (!finalUrl.startsWith('http') && !finalUrl.startsWith('ed2k') && !finalUrl.startsWith('magnet'))) {
      return { success: false, error: '解码后的 URL 格式无效' }
    }

    return { success: true, decodedUrl: finalUrl }
  } catch (error) { return { success: false, error: `解码异常: ${error.message}` } }
}

export function encodeQqdl (url) {
  return 'qqdl://' + btoa(encodeURIComponent(url))
}
