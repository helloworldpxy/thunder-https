export default {
  app: {
    title: 'Thunder HTTPS',
    subtitle: 'Professional Download Link Converter',
    developer: 'Developer',
    license: 'License',
    developerHomepage: 'Developer Homepage',
    projectHomepage: 'Project Homepage',
    copyrightWarning: 'Unauthorized use in any competition, contest, or hackathon is prohibited'
  },
  intro: {
    title: 'Introduction',
    description: 'Thunder HTTPS is a professional download link conversion tool that supports decoding and conversion of multiple download protocols. Built with Electron + Vue 3, it provides an elegant modern interface and efficient, stable conversion services.'
  },
  features: {
    title: 'Core Features',
    multiProtocol: 'Multi-Protocol Support',
    multiProtocolDesc: 'Support Thunder, QQ旋风, FlashGet, eDonkey, Magnet and more',
    smartDetect: 'Smart Detection',
    smartDetectDesc: 'Auto-detect link types and intelligently fix format issues',
    batchConvert: 'Batch Conversion',
    batchConvertDesc: 'Convert multiple links simultaneously for efficiency',
    oneClick: 'One-Click Operation',
    oneClickDesc: 'Copy, open, save - simple and convenient'
  },
  usage: {
    title: 'How to Use',
    step1: 'Paste Links',
    step1Desc: 'Paste download links into the input box (batch supported)',
    step2: 'Click Convert',
    step2Desc: 'Click "Convert Links" button to decode',
    step3: 'Use Results',
    step3Desc: 'Copy links, open in browser, or save to file'
  },
  input: {
    label: 'Input Download Links',
    placeholder: 'Enter download links (supports thunder://, qqdl://, flashget://, ed2k://, magnet:? etc.)\nOne per line, batch conversion supported',
    convert: 'Convert Links',
    clear: 'Clear',
    paste: 'Paste'
  },
  result: {
    title: 'Conversion Results',
    success: 'Success',
    failed: 'Failed',
    protocol: 'Protocol',
    original: 'Original',
    decoded: 'Decoded',
    noResults: 'No conversion results yet'
  },
  action: {
    copyAll: 'Copy All',
    openAll: 'Open All',
    save: 'Save Results',
    import: 'Import File'
  },
  messages: {
    copiedAll: 'All successful links copied to clipboard',
    copiedSingle: 'Link copied to clipboard',
    saveTitle: 'Save Conversion Results',
    error: 'Error',
    noSuccess: 'No successfully converted links',
    emptyInput: 'Please enter links to convert',
    invalidProtocol: 'Unsupported protocol format'
  },
  protocols: {
    thunder: 'Thunder',
    qqdl: 'QQ旋风',
    flashget: 'FlashGet',
    ed2k: 'eDonkey',
    magnet: 'Magnet',
    unknown: 'Unknown'
  }
}
