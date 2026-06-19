import { decodeThunder, encodeThunder } from './protocols/thunder.js'
import { decodeQqdl, encodeQqdl } from './protocols/qqdl.js'
import { decodeFlashget, encodeFlashget } from './protocols/flashget.js'
import { parseEd2k, buildEd2k } from './protocols/ed2k.js'
import { parseMagnet, buildMagnet, hashToMagnet } from './protocols/magnet.js'
import { detectProtocol, cleanUrl, isValidBase64, fixBase64Padding } from './utils/detector.js'
import { base64Decode, base64Encode, safeBase64Decode, base64DecodeUTF8 } from './utils/base64.js'
import { urlDecode, urlEncode, safeUrlDecode, parseUrlParams } from './utils/urlCodec.js'

const DECODERS = { thunder: decodeThunder, qqdl: decodeQqdl, flashget: decodeFlashget, ed2k: parseEd2k, magnet: parseMagnet }
const ENCODERS = { thunder: encodeThunder, qqdl: encodeQqdl, flashget: encodeFlashget, ed2k: buildEd2k, magnet: buildMagnet }

export function decodeUrl (protocol, url) {
  const decoder = DECODERS[protocol]
  if (!decoder) return { success: false, error: `不支持的协议: ${protocol}` }
  return decoder(url)
}

export function encodeUrl (protocol, url) {
  const encoder = ENCODERS[protocol]
  if (!encoder) throw new Error(`不支持的协议: ${protocol}`)
  return encoder(url)
}

export function batchDecode (links) {
  return links.map(({ protocol, url }) => ({ protocol, originalUrl: url, ...decodeUrl(protocol, url) }))
}

export {
  decodeThunder, decodeQqdl, decodeFlashget, parseEd2k, parseMagnet,
  encodeThunder, encodeQqdl, encodeFlashget, buildEd2k, buildMagnet, hashToMagnet,
  detectProtocol, cleanUrl, isValidBase64, fixBase64Padding,
  base64Decode, base64Encode, safeBase64Decode, base64DecodeUTF8,
  urlDecode, urlEncode, safeUrlDecode, parseUrlParams
}
