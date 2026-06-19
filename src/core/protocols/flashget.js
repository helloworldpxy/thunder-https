import { base64DecodeUTF8 } from '../utils/base64.js'
import { urlDecode } from '../utils/urlCodec.js'

export function decodeFlashget (url) {
  try {
    const encoded = url.replace(/^flashget:\/\//i, '')
    if (!encoded) return { success: false, error: '链接内容为空' }

    let decoded
    try { decoded = base64DecodeUTF8(encoded) }
    catch (error) { return { success: false, error: `Base64 解码失败: ${error.message}` } }

    let innerUrl = decoded
    if (innerUrl.includes('[FLASHGET]') && innerUrl.includes('[/FLASHGET]')) {
      innerUrl = innerUrl.replace(/\[FLASHGET\]/g, '').replace(/\[\/FLASHGET\]/g, '')
    } else if (innerUrl.includes('[FLASHGET]')) {
      innerUrl = innerUrl.replace(/\[FLASHGET\]/g, '')
    }

    let finalUrl
    try { finalUrl = urlDecode(innerUrl) }
    catch (error) { finalUrl = innerUrl }

    if (!finalUrl || (!finalUrl.startsWith('http') && !finalUrl.startsWith('ed2k') && !finalUrl.startsWith('magnet'))) {
      return { success: false, error: '解码后的 URL 格式无效' }
    }

    return { success: true, decodedUrl: finalUrl }
  } catch (error) { return { success: false, error: `解码异常: ${error.message}` } }
}

export function encodeFlashget (url) {
  const wrapped = '[FLASHGET]' + encodeURIComponent(url) + '[/FLASHGET]'
  return 'flashget://' + btoa(wrapped)
}
