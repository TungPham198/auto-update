const {
    app,
    protocol,
    BrowserWindow,
    session,
    ipcMain,
    Menu
} = require("electron");
const {
    default: installExtension,
    REDUX_DEVTOOLS,
    REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const SecureElectronLicenseKeys = require("secure-electron-license-keys");
const Protocol = require("./protocol");
const MenuBuilder = require("./menu");
const i18nextBackend = require("i18next-electron-fs-backend");
const i18nextMainBackend = require("../localization/i18n.mainconfig");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const path = require("path");
const fs = require("fs");
const os = require('os');
const child_process = require('child_process');
const axios = require('axios').default;
const ApiServices = require("./modules/api.services")
const http = require('http');
const unzipper = require('unzipper');
const crypto = require("crypto");
const isDev = process.env.NODE_ENV === "development";
const port = 40992; // Hardcoded; needs to match webpack.development.js and package.json
const selfHost = `http://localhost:${port}`;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;
const configs = require("./modules/configs");
const {data} = require("jquery");
var axios_interceptors_rq = false;
var axios_interceptors_rp = false;
let force_quit = false;
const {zip, COMPRESSION_LEVEL} = require('zip-a-folder');

const proxycheck = require("./modules/proxy");
const sshforward = require("./modules/sshforward");
const {use} = require("i18next");

async function createWindow() {

    // If you'd like to set up auto-updating for your app,
    // I'd recommend looking at https://github.com/iffy/electron-updater-example
    // to use the method most suitable for you.
    // eg. autoUpdater.checkForUpdatesAndNotify();

    if (!isDev) {
        // Needs to happen before creating/loading the browser window;
        // protocol is only used in prod
        protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler); /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
    }

    const store = new Store({
        path: app.getPath("userData")
    });
    // Use saved config values for configuring your
    // BrowserWindow, for instance.
    // NOTE - this config is not passcode protected
    // and stores plaintext values
    // let savedConfig = store.mainInitialStore(fs);
    // console.log(savedConfig);
    // Create the browser window.
    win = new BrowserWindow({
        width: 1600,
        height: 980,
        title: "Application is currently initializing...",
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            enableRemoteModule: false,
            additionalArguments: [`storePath:${app.getPath("userData")}`],
            preload: path.join(__dirname, "preload.js"),
            /* eng-disable PRELOAD_JS_CHECK */
            disableBlinkFeatures: "Auxclick"
        }
    });
    win.webContents.send("init_localStorage", {});

    // Sets up main.js bindings for our i18next backend
    i18nextBackend.mainBindings(ipcMain, win, fs);

    // Sets up main.js bindings for our electron store;
    // callback is optional and allows you to use store in main process
    const callback = function (success, initialStore) {
        // console.log(`${!success ? "Un-s" : "S"}uccessfully retrieved store in main process.`);
        // console.log(initialStore);
        // console.log("========================================================================");
        // console.log(axios_interceptors_rq);
        // console.log("Duowng test")

        if (success) {
            global["userLogin"] = initialStore.userlogin !== "undefined" ? initialStore.userlogin : undefined;
            if (axios_interceptors_rq !== false) {
                axios.interceptors.request.eject(axios_interceptors_rq);
            }
            axios_interceptors_rq = axios.interceptors.request.use(function (config) {
                if (initialStore.userlogin && initialStore.userlogin.token) {
                    config.headers.Authorization = `${initialStore.userlogin.token}`
                }
                config.headers.Accept = 'application/json';
                return config;
            }, function (error) {
                console.log("request error");
                return Promise.reject(error);
            });
            if (axios_interceptors_rp !== false) {
                axios.interceptors.response.eject(axios_interceptors_rp);
            }
            axios_interceptors_rp = axios.interceptors.response.use((response) => {
                console.log("response success");
                return response;
            }, (error) => {
                console.log("response error");
                console.log(error)
                return Promise.reject(error);
            });


            // axios.interceptors.request.use(function (config) {
            //     const token = initialStore.userlogin.token;
            //     if (token) {
            //         config.headers.Authorization = `${token}`
            //     }
            //     config.headers.Accept = 'application/json';
            //     return config;
            // }, function (error) {
            //     console.log("request error");
            //     return Promise.reject(error);
            // });
            //
            //
            //
            // axios.interceptors.response.use((response) => {
            //     console.log("response success");
            //     return response;
            // }, (error) => {
            //     console.log("response error");
            //     return Promise.reject(error);
            // });
        }
    };
    store.mainBindings(ipcMain, win, fs, callback);

    // Sets up bindings for our custom context menu
    ContextMenu.mainBindings(ipcMain, win, Menu, isDev, {
        "loudAlertTemplate": [{
            id: "loudAlert",
            label: "AN ALERT!"
        }],
        "softAlertTemplate": [{
            id: "softAlert",
            label: "Soft alert"
        }]
    });

    // Setup bindings for offline license verification
    SecureElectronLicenseKeys.mainBindings(ipcMain, win, fs, crypto, {
        root: process.cwd(),
        version: app.getVersion()
    });

    // Load app
    if (isDev) {
        win.loadURL(selfHost);
    } else {
        win.loadURL(`${Protocol.scheme}://rse/index.html`);
    }
    win.webContents.on("did-finish-load", () => {
        win.setTitle(`Multibrowser (v${app.getVersion()})`);
    });

    // Only do these things when in development
    if (isDev) {

        // Errors are thrown if the dev tools are opened
        // before the DOM is ready
        win.webContents.once("dom-ready", async () => {
            await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
                .then((name) => console.log(`Added Extension: ${name}`))
                .catch((err) => console.log("An error occurred: ", err))
                .finally(() => {
                    require("electron-debug")(); // https://github.com/sindresorhus/electron-debug
                    win.webContents.openDevTools();
                });
        });
    }

    // Emitted when the window is closed.
    win.on("close", () => {
        closeAllBrowsers()
        // win.webContents.executeJavaScript(`window.localStorage.removeItem('browserController');`);
    });
    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
    const ses = session;
    const partition = "default";
    ses.fromPartition(partition) /* eng-disable PERMISSION_REQUEST_HANDLER_JS_CHECK */
        .setPermissionRequestHandler((webContents, permission, permCallback) => {
            const allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

            if (allowedPermissions.includes(permission)) {
                permCallback(true); // Approve permission request
            } else {
                console.error(
                    `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`
                );

                permCallback(false); // Deny
            }
        });

    // https://electronjs.org/docs/tutorial/security#1-only-load-secure-content;
    // The below code can only run when a scheme and host are defined, I thought
    // we could use this over _all_ urls
    // ses.fromPartition(partition).webRequest.onBeforeRequest({urls:["http://localhost./*"]}, (listener) => {
    //   if (listener.url.indexOf("http://") >= 0) {
    //     listener.callback({
    //       cancel: true
    //     });
    //   }
    // });

    menuBuilder = MenuBuilder(win, app.name);

    // Set up necessary bindings to update the menu items
    // based on the current language selected
    i18nextMainBackend.on("initialized", (loaded) => {
        i18nextMainBackend.changeLanguage("en");
        i18nextMainBackend.off("initialized"); // Remove listener to this event as it's not needed anymore
    });

    // When the i18n framework starts up, this event is called
    // (presumably when the default language is initialized)
    // BEFORE the "initialized" event is fired - this causes an
    // error in the logs. To prevent said error, we only call the
    // below code until AFTER the i18n framework has finished its
    // "initialized" event.
    i18nextMainBackend.on("languageChanged", (lng) => {
        if (i18nextMainBackend.isInitialized) {
            menuBuilder.buildMenu(i18nextMainBackend);
        }
    });
}

// Needs to be called before app is ready;
// gives our scheme access to load relative files,
// as well as local storage, cookies, etc.
// https://electronjs.org/docs/api/protocol#protocolregisterschemesasprivilegedcustomschemes
protocol.registerSchemesAsPrivileged([{
    scheme: Protocol.scheme,
    privileges: {
        standard: true,
        secure: true
    }
}]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    } else {
        i18nextBackend.clearMainBindings(ipcMain);
        ContextMenu.clearMainBindings(ipcMain);
        SecureElectronLicenseKeys.clearMainBindings(ipcMain);
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
app.on("web-contents-created", (event, contents) => {
    contents.on("will-navigate", (contentsEvent, navigationUrl) => {
        /* eng-disable LIMIT_NAVIGATION_JS_CHECK  */
        const parsedUrl = new URL(navigationUrl);
        const validOrigins = [selfHost];

        // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
        if (!validOrigins.includes(parsedUrl.origin)) {
            console.error(
                `The application tried to navigate to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`
            );

            contentsEvent.preventDefault();
        }
    });

    contents.on("will-redirect", (contentsEvent, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);
        const validOrigins = [];

        // Log and prevent the app from redirecting to a new page
        if (!validOrigins.includes(parsedUrl.origin)) {
            console.error(
                `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
            );

            contentsEvent.preventDefault();
        }
    });

    // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
    contents.on("will-attach-webview", (contentsEvent, webPreferences, params) => {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload;
        delete webPreferences.preloadURL;

        // Disable Node.js integration
        webPreferences.nodeIntegration = false;
    });

    // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
    // This code replaces the old "new-window" event handling;
    // https://github.com/electron/electron/pull/24517#issue-447670981
    contents.setWindowOpenHandler(({
                                       url
                                   }) => {
        const parsedUrl = new URL(url);
        const validOrigins = [];

        // Log and prevent opening up a new window
        if (!validOrigins.includes(parsedUrl.origin)) {
            console.error(
                `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`
            );

            return {
                action: "deny"
            };
        }

        return {
            action: "allow"
        };
    });
});

// Filter loading any module via remote;
// you shouldn't be using remote at all, though
// https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module
app.on("remote-require", (event, webContents, moduleName) => {
    event.preventDefault();
});

// built-ins are modules such as "app"
app.on("remote-get-builtin", (event, webContents, moduleName) => {
    event.preventDefault();
});

app.on("remote-get-global", (event, webContents, globalName) => {
    event.preventDefault();
});

app.on("remote-get-current-window", (event, webContents) => {
    event.preventDefault();
});

app.on("remote-get-current-web-contents", (event, webContents) => {
    event.preventDefault();
});

ipcMain.on("mb_download", (event, args) => {
    switch (args.action) {
        case 'orbita':
            resourcesDownload(args.browser, args.default_profile, args.df_file_name);
            break;
        case 'save_default_profile_name':
            global["default_profile_name"] = args.default_profile_name
            break;
        default:
            break;
    }
});
ipcMain.on("kit_checkproxy", (event, args) => {
    proxycheck.handleCheckproxy(args.urlcheck, args.type, args.host, args.port, args.user, args.pass)
        .then((success) => {
            //args.handleCheckProxy({status:"live",info:success.data})
            event.reply('kit_checkproxy_reply', {status: "live", info: success.data})
        }).catch((error) => {
        console.log(error);
        //args.handleCheckProxy({status:"die",info:{}})
        event.reply('kit_checkproxy_reply', {status: "die", info: {}})
    });
});

var _downloaded = 0;
var _download_total = 0;
var _f_count = 0;

async function resourcesDownload(_browser, _default_profile, _default_profile_name) {
    _f_count = 0;
    if (!_default_profile) {
        _f_count++;
        win.webContents.send("mb_download_res", {"status": "downloading", "percent": 0, "text": "Zero profile download"});
        await ApiServices.DownloadPubFile(configs.base_url + configs.resource_download_path + _default_profile_name, path.join(configs.homedir, _default_profile_name), false, progress_resource_download, progress_resource_done,"Zero profile download");
    }
    if (!_browser) {
        _f_count++;
        if (!fs.existsSync(path.join(configs.homedir, "browser/orbita"))) {
            fs.mkdirSync(path.join(configs.homedir, "browser/orbita"), {recursive: true});
        }
        win.webContents.send("mb_download_res", {"status": "downloading", "percent": 0, "text": "Browser download"});
        await ApiServices.DownloadPubFile(configs.base_url + configs.resource_download_path + "orbita-lastest-" + os.platform() + ".zip", path.join(configs.homedir, "browser/orbita"), true, progress_resource_download, progress_resource_done,"Browser download");
    }
}

function progress_resource_download(_dl, _file_lenth, _title) {
    _downloaded += _dl;
    _download_total += _file_lenth;
    let _percent = (100.0 * _downloaded / _download_total).toFixed(2);
    win.webContents.send("mb_download_res", {"status": "downloading", "percent": _percent, "text": _title});
}

function progress_resource_done() {
    _f_count--;
    if (_f_count === 0) {
        _downloaded = 0;
        _download_total = 0;
        win.webContents.send("mb_download_res", {"status": "successfully", "percent": 100});
    }
}

ipcMain.handle('sendInfoDevice', async () => {

    var total_memory = os.totalmem();
    var total_mem_in_kb = total_memory / 1024;
    var total_mem_in_mb = total_mem_in_kb / 1024;
    var total_mem_in_gb = total_mem_in_mb / 1024;

    total_mem_in_gb = Math.round(total_mem_in_gb);

    let data = {
        'machine_name': os.hostname(),
        'ram': total_mem_in_gb,
        'os_type': os.type(),
        'platform': os.platform(),
        'displaying_processor_name': os.cpus().shift().model,
    }
    return data;
});

global["browser_process"] = {}
global["browsers_info"] = {}

function openBrowser(_uuid, freeport = null) {
    const _os = os.platform();
    switch (_os) {
        case "win32":
            //Open browser in window
            openBrowserInWin32(_uuid, freeport)
            break;
        case "darwin":
            break;
        case "linux":
            break;
    }
}

async function openBrowserInWin32(_uuid, freeport) {
    let args = []
    args.push('--user-data-dir=' + configs.profiles_temp + "\\" + _uuid, '--flag-switches-begin', '--flag-switches-end', '--enable-audio-service-sandbox')
    if (freeport) args.push(' --remote-debugging-port=' + freeport)
    if (browsers_info[_uuid].hasOwnProperty("proxy") && browsers_info[_uuid].proxy !== "") {
        const _proxy = browsers_info[_uuid].proxy;
        switch (_proxy.type) {
            case "SOCK5":
                args.push("--proxy-server=socks5://" + _proxy.ip + ":" + _proxy.port)
                break;
            case "SSH":
                const proxy_info = await sshforward.handleForwardSSH(_proxy.ip, _proxy.port, _proxy.user, _proxy.pass)
                args.push("--proxy-server=socks5://127.0.0.1:" + proxy_info.port)
                break
            case "HTTP":
                args.push("--proxy-server=" + _proxy.ip + ":" + _proxy.port)
            case "SOCK4":
                args.push("--proxy-server=" + _proxy.ip + ":" + _proxy.port)
            default:
                break

        }
    }
    let browser_process = child_process.spawn(configs.homedir + '/browser/orbita/chrome.exe', args);
    global["browser_process"][_uuid] = browser_process
    browser_process.on('error', function (err) {
        console.log(err)
    })
    browser_process.on('close', function (code, signal) {
        console.log('close' + code);
        console.log('signal' + signal);
        stopBrowser(_uuid)
    });
    browser_process.on('exit', function (code, signal) {
        console.log('exit' + code);
        console.log('signal' + signal);
    });
    win.webContents.send("browser_actions", {
        type: "opened",
        uuid: _uuid
    });

}

async function backupAndSyncProfile(uuid) {
    if (fs.existsSync(path.join(configs.profiles_temp, uuid, "Default", "Cache"))) {
        fs.rmSync(path.join(configs.profiles_temp, uuid, "Default", "Cache"), {recursive: true, force: true})
    }
    if (fs.existsSync(path.join(configs.profiles_temp, uuid, "Default", "Code Cache"))) {
        fs.rmSync(path.join(configs.profiles_temp, uuid, "Default", "Code Cache"), {recursive: true, force: true})
    }
    if (fs.existsSync(path.join(configs.profiles_temp, uuid, "Default", "GPUCache"))) {
        fs.rmSync(path.join(configs.profiles_temp, uuid, "Default", "GPUCache"), {recursive: true, force: true})
    }
    await zipDirectory(configs.profiles_temp + "/" + uuid, configs.profiles_temp + "/" + uuid + ".zip");
    const _rp = await ApiServices.UploadZipFile(configs.profiles_temp + "/" + uuid + ".zip", uuid, browsers_info[uuid]["config"])
    await ApiServices.CloseBrowser(uuid)
    delete global["browsers_info"][uuid]
    delete global["browser_process"][uuid]
    console.log(_rp.data)
    //Remove zip file and profile folder
    if (fs.existsSync(configs.profiles_temp + "/" + uuid + ".zip")) {
        fs.rmSync(configs.profiles_temp + "/" + uuid + ".zip", {recursive: true, force: true})
    }
    if (fs.existsSync(configs.profiles_temp + "/" + uuid)) {
        fs.rmSync(configs.profiles_temp + "/" + uuid, {recursive: true, force: true})
    }
    console.log("browser_actions closed")
    win.webContents.send("browser_actions", {
        type: "closed",
        uuid: uuid
    });
}

async function zipDirectory(sourceDir, outPath) {
    return await zip(sourceDir, outPath, {compression: COMPRESSION_LEVEL.high});
    // const archive = archiver('zip', {zlib: {level: 9}});
    // const stream = fs.createWriteStream(outPath);
    // return new Promise((resolve, reject) => {
    //     archive
    //         .directory(sourceDir, false)
    //         .on('error', err => reject(err))
    //         .pipe(stream)
    //     ;
    //     stream.on('close', () => {
    //         resolve(true)
    //     });
    //     archive.finalize();
    // });
}

function closeAllBrowsers() {
    console.log("closingggg")
    Object.entries(global["browser_process"]).forEach(async ([uuid, _c_process]) => {
        try {
            _c_process.kill()
        } catch (err) {
            console.log("Kill browser error=========================")
            console.log(err)
        }
    });
}

async function overwrite_preferences(uuid) {
    try {
        const res = await ApiServices.GetPreferencesFile(uuid)
        res.data.pipe(fs.createWriteStream(path.join(configs.profiles_temp, uuid, "Default", "Preferences")))
            .on("finish", () => {
                openBrowser(uuid)
            });
    } catch (error) {
        console.log(error)
    }
}

async function startBrowser(uuid) {
    try {
        const browser_info = await ApiServices.GetBrowserInfo(uuid);
        win.webContents.send("browser_actions", {
            type: "syncing",
            uuid: uuid
        });
        browsers_info[uuid] = browser_info.data.content
        if (browser_info.data.content.link !== '') {
            ApiServices.DownloadFile(browser_info.data.content.link, configs.profiles_temp + "/" + uuid, true, function () {
                console.log("DownloadFile done callback")
                overwrite_preferences(uuid)
            })
        } else {
            fs.createReadStream(path.join(configs.homedir, global["default_profile_name"]))
                .pipe(unzipper.Extract({path: configs.profiles_temp + "/" + uuid}))
                .promise()
                .then(function () {
                    overwrite_preferences(uuid)
                })
        }
    } catch (error) {
        console.log(error)
        if (!error.response) {
            win.webContents.send("browser_actions", {
                type: "notice",
                uuid: uuid,
                content: "Error: Network Error"
            });
        } else {
            win.webContents.send("browser_actions", {
                type: "notice",
                uuid: uuid,
                content: error.response.data
            });
        }
    }
}

async function stopBrowser(uuid) {
    win.webContents.send("browser_actions", {
        type: "closing",
        uuid: uuid
    });
    backupAndSyncProfile(uuid);
}
if (global["userLogin"] && global["userLogin"]["token"]) {
    pingBrowser()
}

function pingBrowser() {
    setInterval(async () => {
        const _uuids = Object.keys(browser_process)
        const _ping_rp = await ApiServices.PingBrowser(Object.keys(browser_process))
        console.log(_ping_rp.data)
        win.webContents.send("browser_actions", {
            type: "ping"
        });
    }, 20000)

}

ipcMain.on("browser_actions", (event, args) => {
    switch (args.type) {
        case "start_browser":
            startBrowser(args.uuid);
            break;
        case "stop_browser":
            browser_process[args.uuid].kill()
            break;
        default:
            throw new Error("Undefined action!");
    }
});
/**
 * Handle get infor ip
 */
ipcMain.handle('get_ip_infor', async (event, args) => {
    const axiosInstance = axios.create();
    return await axiosInstance.get(args.urlCheckInfor, args.options).then((res) => res.data).catch((err) => err.response.data);
});

function test_cbt() {
    fs.createReadStream("C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\96452c32-bcaf-48c5-98ad-915e1836ec84\\2022-5-df09ad404ce76449942d0a2b32347afd_1.zip")
        .pipe(unzipper.Extract({path: "C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\a"}))
        .on("error", (err) => {
            console.log(err)
        })
    // var readStream = fs.createReadStream("C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\96452c32-bcaf-48c5-98ad-915e1836ec84\\2022-5-df09ad404ce76449942d0a2b32347afd_1.zip");
    // var writeStream = fstream.Writer("C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\a");
    //
    // readStream
    //     .pipe(unzip.Parse())
    //     .pipe(writeStream)
    // decompress("C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\96452c32-bcaf-48c5-98ad-915e1836ec84\\2022-5-df09ad404ce76449942d0a2b32347afd_2.zip", "C:\\Users\\CBT\\AppData\\Local\\Temp\\.multibrowser\\a").then(() => {
    //     // fs.rmSync(path.join(_path, _filename), { recursive: true, force: true })
    //     // if (_end_callback) _end_callback(true);
    //     console.log("axios done")
    // }).catch((err)=>{
    //     console.log("========DownloadFile Error==========")
    //     console.log(err)
    // })
}





//test auto update
// const { autoUpdater, dialog } = require('electron');
// const server = 'https://electron.minhhoangjsc.io';
// // const url = `${server}/update/Windows 64 bit/${app.getVersion()}`;
// const url = `${server}/update/${process.platform}/${app.getVersion()}`;
// autoUpdater.setFeedURL({ url })


// setInterval(() => {
//     autoUpdater.checkForUpdates()
//     console.log(url);
//   }, 500)

//   autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//     const dialogOpts = {
//       type: 'info',
//       buttons: ['Restart', 'Later'],
//       title: 'Application Update',
//       message: process.platform === 'win32' ? releaseNotes : releaseName,
//       detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//     }
  
//     dialog.showMessageBox(dialogOpts).then((returnValue) => {
//       if (returnValue.response === 0) autoUpdater.quitAndInstall()
//     })
//   })

//   autoUpdater.on('error', message => {
//     console.error('There was a problem updating the application')
//     console.error(message)
//   })

autoUpdater.channel = 'latest'
autoUpdater.allowDowngrade = false

autoUpdater.logger = logger
autoUpdater.logger.transports.file.level = 'silly'
autoUpdater.logger.transports.file.appName = 'private repo'
autoUpdater.autoDownload = true

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    message: 'update Downloaded !!'
  })
})

autoUpdater.on('checking-for-update', () => {
  dialog.showMessageBox({
    message: 'CHECKING FOR UPDATES !!'
  })
})

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    message: ' update-available !!'
  })
})

autoUpdater.on('error', (error) => {
  autoUpdater.logger.debug(error)
})