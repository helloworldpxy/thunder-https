export function useClipboard () {
  const copyToClipboard = async (text) => {
    try {
      const result = await window.electronAPI.clipboard.write(text)
      return result.success
    } catch (error) { console.error('复制到剪贴板失败:', error); return false }
  }
  const readFromClipboard = async () => {
    try {
      const result = await window.electronAPI.clipboard.read()
      return result.success ? result.text : null
    } catch (error) { console.error('读取剪贴板失败:', error); return null }
  }
  return { copyToClipboard, readFromClipboard }
}
