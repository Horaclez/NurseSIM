const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let win;
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

  app.whenReady().then(() => {
    win = new BrowserWindow({
      width: 480, height: 860, minWidth: 360, minHeight: 600,
      show: false, backgroundColor: '#edf1f2', title: 'Simulador de Enfermería Chile',
      icon: path.join(__dirname, '..', 'build', 'icon.png'),
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
    });
    Menu.setApplicationMenu(null);
    win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
    win.once('ready-to-show', () => win.show());
    win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
    win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
  });
  app.on('window-all-closed', () => app.quit());
}
