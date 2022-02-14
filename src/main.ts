import { writeFile, mkdir, readdir, rm } from 'fs/promises';
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
import ElectronStore from 'electron-store';

const isDev = process.env.NODE_ENV === 'development';
const store = new ElectronStore({
  defaults: {
    markdownData: '',
    currentFile: '',
  },
});

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

  ipcMain.on('set-markdown-data', (event, data: string) => {
    store.set('markdownData', data);

    return store.get('markdownData');
  });
};

const createMenu = () => {
  const menuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '新規ワークスペース',
          click: async (event, focusedWindow) => {
            if (!focusedWindow) return;

            const dirPath = await dialog
              .showOpenDialog(focusedWindow, {
                properties: ['openDirectory'],
                buttonLabel: '開く',
                title: '新規ワークスペース',
                message: '選択したフォルダをワークスペースとして初期化します',
              })
              .then((result) => {
                if (result.canceled) return null;

                return result.filePaths[0];
              });

            if (!dirPath) return;

            const existingFiles = await readdir(dirPath);

            if (existingFiles.length) {
              const canDeleteExistingFiles = await dialog
                .showMessageBox(focusedWindow, {
                  title: '警告',
                  message:
                    '初期化を実行すると既存のファイルは削除されます。この操作は取り消せません。',
                  buttons: ['続ける', 'キャンセル'],
                  cancelId: 1,
                })
                .then((result) => result.response === 0);

              if (!canDeleteExistingFiles) return;
            }

            await rm(`${dirPath}`, { recursive: true, force: true });
            await mkdir(dirPath);
            await mkdir(`${dirPath}/articles`);
            await mkdir(`${dirPath}/books`);
          },
        },
        {
          label: '名前を付けて保存',
          click: async (event, focusedWindow) => {
            if (!focusedWindow) return;

            const filePath = await dialog
              .showSaveDialog(focusedWindow, {
                buttonLabel: '保存',
                title: '名前を付けて保存',
                filters: [{ name: 'Markdown テキスト', extensions: ['md'] }],
              })
              .then((result) => {
                if (result.canceled) return null;

                return result.filePath;
              });

            if (!filePath) return;

            await writeFile(filePath, store.get('markdownData'));
            store.set('currentFile', filePath);
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
