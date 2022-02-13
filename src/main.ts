import path from 'path';
import { app, BrowserWindow } from 'electron';
import electronReload from 'electron-reload';

const isDev = process.env.NODE_ENV === 'development';

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

  mainWindow.loadFile('dist/index.html');
  mainWindow.once('ready-to-show', () => mainWindow.show());
};

app.whenReady().then(async () => {
  createWindow();
});

app.once('window-all-closed', () => app.quit());
