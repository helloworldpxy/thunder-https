export function parseEd2k (url) {
  try {
    if (!url.toLowerCase().startsWith('ed2k://')) return { success: false, error: '不是有效的电驴链接' }

    const parts = url.split('|')
    if (parts.length < 5) return { success: false, error: '电驴链接格式不完整' }

    const [protocol, type, filename, size, hash] = parts
    if (type !== 'file') return { success: false, error: `不支持的电驴链接类型: ${type}` }
    if (!/^[A-Fa-f0-9]{32}$/.test(hash)) return { success: false, error: '无效的文件哈希格式' }

    const fileSize = parseInt(size, 10)
    if (isNaN(fileSize) || fileSize < 0) return { success: false, error: '无效的文件大小' }

    return {
      success: true, decodedUrl: url,
      metadata: { filename, size: fileSize, hash, sizeFormatted: formatFileSize(fileSize) }
    }
  } catch (error) { return { success: false, error: `解析异常: ${error.message}` } }
}

export function buildEd2k ({ filename, size, hash }) {
  return `ed2k://|file|${filename}|${size}|${hash}|/`
}

function formatFileSize (bytes) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i]
}
