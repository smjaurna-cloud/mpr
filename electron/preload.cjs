// @ts-check
const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// native desktop features safely without exposing node internals.
contextBridge.exposeInMainWorld("desktopAPI", {
  isDesktop: true,
  platform: process.platform,
  version: "1.0.0",
});
