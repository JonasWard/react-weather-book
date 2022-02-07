const {BrowserWindow, app} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL('http://localhost:3000');

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()
})

// clsoing the app from closing when all windows are closed on osX
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// more osX flavor, when no windows are open but app is still on and reactivated, create a window
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})