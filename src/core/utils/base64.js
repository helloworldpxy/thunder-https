export function base64Decode (encoded) {
  try { return atob(encoded) }
  catch (error) { throw new Error(`Base64 解码失败: ${error.message}`) }
}

export function base64Encode (str) {
  try { return btoa(str) }
  catch (error) { throw new Error(`Base64 编码失败: ${error.message}`) }
}

export function safeBase64Decode (encoded) {
  const paddingNeeded = (4 - (encoded.length % 4)) % 4
  const padded = encoded + '='.repeat(paddingNeeded)
  return base64Decode(padded)
}

export function base64DecodeUTF8 (encoded) {
  try {
    const binary = atob(encoded)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return new TextDecoder('utf-8').decode(bytes)
  } catch (error) { throw new Error(`Base64 UTF-8 解码失败: ${error.message}`) }
}
