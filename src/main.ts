import { writeFileSync } from 'fs';
import path from 'path';
import {
  app,
  BrowserWindow,
  MenuItem,
  MenuItemConstructorOptions,
  shell,
  Menu,
  ipcMain,
  dialog,
} from 'electron';
import electronReload from 'electron-reload';

const isDev = process.env.NODE_ENV === 'development';
const electronState = {
  markdownData: '',
};

if (isDev) {
  electronReload(__dirname, {
    electron: path.resolve(
      __dirname,
      '../node_modules/electron/dist/electron.exe',
    ),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  // リンククリック時の処理
  mainWindow.webContents.on('will-navigate', (e, url) => {
    // ブラウザで開く
    shell.openExternal(url);
    // アプリ内で開こうとするのを防ぐ
    e.preventDefault();
  });

  // 新しいウィンドウを開く時の処理
  mainWindow.webContents.setWindowOpenHandler((details) => {
    // ブラウザで開くように強制する
    shell.openExternal(details.url);

    return {
      action: 'deny',
    };
  });

  // 開発時にはデベロッパーツールを開く
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

  mainWindow.loadFile('dist/index.html');
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', () => app.quit());

  ipcMain.on('save-markdown-data', (event, data) => {
    electronState.markdownData = data;

    return electronState.markdownData;
  });
};

const createMenu = () => {
  const menuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '名前を付けて保存',
          click: async (event, focusedWindow) => {
            if (!focusedWindow) return;

            const filePath = await dialog
              .showOpenDialog(focusedWindow, {
                properties: ['openFile'],
                buttonLabel: '保存',
                title: '名前を付けて保存',
                filters: [{ name: 'Markdown テキスト', extensions: ['md'] }],
              })
              .then((result) => {
                if (result.canceled) return null;

                return result.filePaths[0];
              });

            if (!filePath) return;

            writeFileSync(filePath, electronState.markdownData);
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

app.whenReady().then(async () => {
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => app.quit());
