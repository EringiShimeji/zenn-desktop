import { contextBridge, ipcRenderer } from 'electron';
import markdownToHtml from 'zenn-markdown-html';

// zenn関係のAPI
contextBridge.exposeInMainWorld('zenn', {
  markdownToHtml,
});

// ファイルIO関係のAPI
contextBridge.exposeInMainWorld(
  'fileIO',
  {
    saveMarkdownData: (data: string) =>
      ipcRenderer.send('save-markdown-data', data),
  },
  // (() => {
  //   // エディターが持っているマークダウンテキスト
  //   // メインプロセスとレンダラープロセスで共有するためにクロージャを作成している
  //   let markdownData = '';

  //   return {
  //     // マークダウンテキストを操作する
  //     handleMarkdownData: (
  //       option: { query: 'save'; data: string } | { query: 'load' },
  //     ) => {
  //       switch (option.query) {
  //         case 'save':
  //           markdownData = option.data;
  //           return markdownData;

  //         case 'load':
  //           return markdownData;

  //         default:
  //           return null;
  //       }
  //     },
  //   };
  // })(),
);
