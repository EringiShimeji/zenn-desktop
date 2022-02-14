import { contextBridge, ipcRenderer } from 'electron';
import markdownToHtml from 'zenn-markdown-html';

// zenn関係のAPI
contextBridge.exposeInMainWorld('zenn', {
  markdownToHtml,
});

// electron-store関係のAPI
contextBridge.exposeInMainWorld('store', {
  setMarkdownData: (data: string) =>
    ipcRenderer.send('set-markdown-data', data),
});
