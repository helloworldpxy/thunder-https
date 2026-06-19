export default {
  app: {
    title: 'Thunder HTTPS',
    subtitle: '专业下载链接转换工具',
    developer: '开发者',
    license: '许可证',
    developerHomepage: '开发者主页',
    projectHomepage: '项目主页',
    copyrightWarning: '未经作者书面授权，禁止将本项目用于任何比赛、竞赛、黑客松等竞技活动'
  },
  intro: {
    title: '项目简介',
    description: 'Thunder HTTPS 是一款专业的下载链接转换工具，支持多种下载协议的解码和转换。基于 Electron + Vue 3 构建，提供优雅的现代化界面和高效稳定的转换服务。'
  },
  features: {
    title: '核心功能',
    multiProtocol: '多协议支持',
    multiProtocolDesc: '支持迅雷、QQ旋风、快车、电驴、磁力链接等主流下载协议',
    smartDetect: '智能识别',
    smartDetectDesc: '自动检测链接类型，智能修复格式问题',
    batchConvert: '批量转换',
    batchConvertDesc: '支持多行链接同时转换，高效处理',
    oneClick: '一键操作',
    oneClickDesc: '复制、打开、保存，操作简单便捷'
  },
  usage: {
    title: '使用方法',
    step1: '粘贴链接',
    step1Desc: '将下载链接粘贴到输入框（支持批量）',
    step2: '点击转换',
    step2Desc: '点击"转换链接"按钮进行解码',
    step3: '使用结果',
    step3Desc: '复制链接、打开浏览器或保存到文件'
  },
  input: {
    label: '输入下载链接',
    placeholder: '请输入下载链接（支持 thunder://、qqdl://、flashget://、ed2k://、magnet:? 等协议）\n每行一个，支持批量转换',
    convert: '转换链接',
    clear: '清空',
    paste: '粘贴'
  },
  result: {
    title: '转换结果',
    success: '成功',
    failed: '失败',
    protocol: '协议',
    original: '原始链接',
    decoded: '解码链接',
    noResults: '暂无转换结果'
  },
  action: {
    copyAll: '复制全部',
    openAll: '打开全部',
    save: '保存结果',
    import: '导入文件'
  },
  messages: {
    copiedAll: '已复制所有成功链接到剪贴板',
    copiedSingle: '已复制链接到剪贴板',
    saveTitle: '保存转换结果',
    error: '错误',
    noSuccess: '没有成功转换的链接',
    emptyInput: '请输入要转换的链接',
    invalidProtocol: '不支持的协议格式'
  },
  protocols: {
    thunder: '迅雷',
    qqdl: 'QQ旋风',
    flashget: '快车',
    ed2k: '电驴',
    magnet: '磁力链接',
    unknown: '未知协议'
  }
}
