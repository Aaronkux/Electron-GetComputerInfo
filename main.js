const { app, BrowserWindow, ipcMain } = require('electron')
const getComputerInfo = require("./getComputerInfo.js");
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  ipcMain.on("get-computer-info", async (e) => {
    const res = await getComputerInfo();
    e.reply("reply-computer-info", res);
  });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})