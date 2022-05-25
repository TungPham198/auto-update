
const checkProxy = (urlcheck,proxyState, handleProxyCheck) => {
    window.api.mb_ipcRenderer.sendMsg("kit_checkproxy",{
        urlcheck: urlcheck,
        type: proxyState.type,
        host: proxyState.ip,
        port: proxyState.port,
        user: proxyState.user == "" ? undefined : proxyState.user,
        pass: proxyState.pass == "" ? undefined : proxyState.pass
    })
    window.api.mb_ipcRenderer.receiveMsg("kit_checkproxy_reply",handleProxyCheck);
}
export default checkProxy;