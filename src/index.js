const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const url = require("url");
const path = require("path");

let mainWindow;
let newProductWindow;

// Reload in Development for Browser Windows
if (process.env.NODE_ENV !== "production") {
	require("electron-reload")(__dirname, {
		electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
	});
}

app.on("ready", () => {
	// The Main Window
	mainWindow = new BrowserWindow({
		width: 720,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "views/index.html"),
			protocol: "file",
			slashes: true,
		})
	);

	// Menu
	const mainMenu = Menu.buildFromTemplate(templateMenu);
	// Set The Menu to the Main Window
	Menu.setApplicationMenu(mainMenu);

	// If we close main Window the App quit
	mainWindow.on("closed", () => {
		app.quit();
	});
});

// Menu Template
const templateMenu = [
	{
		label: "File",
		submenu: [
			{
				label: "New Product",
				accelerator: "Ctrl+N",
				click() {
					createNewProductWindow();
				},
			},
			{
				label: "Remove All Products",
				click() {
					mainWindow.webContents.send("products:remove-all");
				},
			},
			{
				label: "Exit",
				accelerator: process.platform == "darwin" ? "command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				},
			},
		],
	},
];
