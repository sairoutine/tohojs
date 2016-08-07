// electron エントリポイント
'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
	  width: 640,
	  height: 480,
	  //"transparent": true,    // ウィンドウの背景を透過
	  //"frame": false,     // 枠の無いウィンドウ
	  "resizable": false,  // ウィンドウのリサイズを禁止
	  alwaysOnTop: true,
	});
	mainWindow.loadURL(`file://${__dirname}/public/index.html`);

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
