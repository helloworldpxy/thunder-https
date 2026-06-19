const { ipcMain, clipboard, shell, dialog } = require('electron')
const fs = require('fs')

function setupIPC () {
  ipcMain.handle('clipboard:write', async (event, text) => {
    try { clipboard.writeText(text); return { success: true } }
    catch (error) { return { success: false, error: error.message } }
  })

  ipcMain.handle('clipboard:read', async () => {
    try { return { success: true, text: clipboard.readText() } }
    catch (error) { return { success: false, error: error.message } }
  })

  ipcMain.handle('shell:openExternal', async (event, url) => {
    try { await shell.openExternal(url); return { success: true } }
    catch (error) { return { success: false, error: error.message } }
  })

  ipcMain.handle('dialog:saveFile', async (event, options) => {
    try {
      const result = await dialog.showSaveDialog({
        title: options.title || '保存文件',
        defaultPath: options.defaultPath || '转换结果.txt',
        filters: [{ name: '文本文件', extensions: ['txt'] }, { name: 'JSON文件', extensions: ['json'] }, { name: '所有文件', extensions: ['*'] }]
      })
      if (!result.canceled && result.filePath) {
        fs.writeFileSync(result.filePath, options.content, 'utf-8')
        return { success: true, filePath: result.filePath }
      }
      return { success: false, error: '用户取消操作' }
    } catch (error) { return { success: false, error: error.message } }
  })

  ipcMain.handle('dialog:openFile', async () => {
    try {
      const result = await dialog.showOpenDialog({
        title: '打开文件',
        filters: [{ name: '文本文件', extensions: ['txt'] }, { name: '所有文件', extensions: ['*'] }],
        properties: ['openFile']
      })
      if (!result.canceled && result.filePaths.length > 0) {
        return { success: true, content: fs.readFileSync(result.filePaths[0], 'utf-8'), filePath: result.filePaths[0] }
      }
      return { success: false, error: '用户取消操作' }
    } catch (error) { return { success: false, error: error.message } }
  })
}

module.exports = { setupIPC }
