import { ref, computed } from 'vue'
import { detectProtocol, decodeUrl } from '../../core/index.js'

export function useConverter () {
  const results = ref([])
  const hasSuccess = computed(() => results.value.some(r => r.success))

  const convert = (inputText) => {
    if (!inputText || !inputText.trim()) { results.value = []; return }
    const lines = inputText.split('\n').filter(line => line.trim())
    const convertedResults = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine) continue
      const protocol = detectProtocol(trimmedLine)

      if (!protocol) {
        const smartResult = trySmartDetect(trimmedLine)
        if (smartResult) { convertedResults.push(smartResult) }
        else { convertedResults.push({ success: false, protocol: 'unknown', originalUrl: trimmedLine, decodedUrl: null, error: '无法识别的链接格式' }) }
        continue
      }

      const decoded = decodeUrl(protocol, trimmedLine)
      convertedResults.push({ ...decoded, protocol, originalUrl: trimmedLine })
    }
    results.value = convertedResults
  }

  const trySmartDetect = (text) => {
    try {
      const decoded = decodeURIComponent(text)
      if (decoded !== text) {
        const protocol = detectProtocol(decoded)
        if (protocol) {
          const result = decodeUrl(protocol, decoded)
          return { ...result, protocol, originalUrl: text, fixed: true, fixMethod: 'URL解码修复' }
        }
      }
    } catch (e) {}

    if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length % 4 === 0) {
      try {
        const decoded = atob(text)
        if (decoded.startsWith('AA') && decoded.endsWith('ZZ')) {
          const url = decodeURIComponent(decoded.slice(2, -2))
          return { success: true, protocol: 'thunder', originalUrl: 'thunder://' + text, decodedUrl: url, fixed: true, fixMethod: '自动补充thunder://前缀' }
        }
      } catch (e) {}
    }

    if (/^[A-Fa-f0-9]{40}$/.test(text) || /^[A-Za-z0-9]{32}$/.test(text)) {
      return { success: true, protocol: 'magnet', originalUrl: text, decodedUrl: `magnet:?xt=urn:btih:${text}`, fixed: true, fixMethod: '自动构建magnet链接' }
    }
    return null
  }

  return { results, hasSuccess, convert }
}
