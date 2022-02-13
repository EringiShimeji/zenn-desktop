import { contextBridge } from 'electron';
import markdownToHtml from 'zenn-markdown-html';

contextBridge.exposeInMainWorld('zenn', {
  markdownToHtml,
});
