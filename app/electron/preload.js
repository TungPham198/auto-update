const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
const http = require("http");
const os = require('os');
const configs = require("./modules/configs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const SecureElectronLicenseKeys = require("secure-electron-license-keys");

const proxycheck = require("./modules/proxy");

// Create the electron store to be made available in the renderer process
const store = new Store();
if(!fs.existsSync(configs.homedir)){
  fs.mkdirSync(configs.homedir, {recursive: true});
}
if(!fs.existsSync(configs.profiles_temp)){
  fs.mkdirSync(configs.profiles_temp, {recursive: true});
}
ipcRenderer.removeAllListeners("init_localStorage");
ipcRenderer.on("init_localStorage", (event, ...args) =>{
    window.localStorage.removeItem('browserController')
});

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer, process),
  store: store.preloadBindings(ipcRenderer, fs),
  fs: fs,
  path: path,
  http: http,
  os: os,
  configs: configs,
  ipcRenderer:ipcRenderer,
  mb_ipcRenderer: {
    sendMsg: (channel, data) => {
      // whitelist channels
      let validChannels = ["mb_download","browser_actions","kit_checkproxy","kit_shhForwardSock5"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receiveMsg: (channel, func) => {
      let validChannels = ["mb_download_res","browser_actions", "kit_checkproxy_reply"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        const subscription = (event, ...args) => func(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
          ipcRenderer.removeListener(channel, subscription);
        }
      }
    },
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    sendSyncMsg: (channel, data) => {
        return ipcRenderer.sendSync(channel, data);
    }
  },
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer),
});

contextBridge.exposeInMainWorld('electronAPI', {
  getInfoDevice: () => ipcRenderer.invoke('sendInfoDevice'),
  getInfoIp: (data) =>  ipcRenderer.invoke('get_ip_infor', data),
})

