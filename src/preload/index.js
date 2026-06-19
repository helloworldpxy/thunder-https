const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  clipboard: {
    write: (text) => ipcRenderer.invoke('clipboard:write', text),
    read: () => ipcRenderer.invoke('clipboard:read')
  },
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  dialog: {
    saveFile: (options) => ipcRenderer.invoke('dialog:saveFile', options),
    openFile: () => ipcRenderer.invoke('dialog:openFile')
  }
})
