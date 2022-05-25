import IpInforService from "../service/ipinfor.service";
import MultiToast from "./defaultToast";
import { handleSetTimezoneWebRTCGeolocation } from "../redux/components/browser/browserSilce";
import { handleSetIpInfo } from "../redux/components/ipinfo/ipInfoConfigSlice";
import { handleSetDeviceInfo } from "../redux/components/deviceinfo/deviceInfoConfigSlice";


const loadDeviceConfig = (store)=>{
    IpInforService.getDeviceInfo().then(res=>{
        return store.dispatch(handleSetDeviceInfo(res));
    }).catch(e=>MultiToast.simpleToast({ type: 'error', title: "Auto platform functions have errors" }))
}




/**
 * Handle get ip infor for timezone, webrtc, geolocation.
 * @param {*} store 
 */
const loadIpConfig = (store) => {
    IpInforService.getIpInfor()
    .then((res) => {
        if (res.hasOwnProperty('ip')) {
            store.dispatch(handleSetIpInfo(res));
            return store.dispatch(handleSetTimezoneWebRTCGeolocation(res));
        }
        MultiToast.simpleToast({ type: 'error', title: "Auto timezone, webrtc, geolocation functions have errors" })
    })
};

export default {
    loadIpConfig,
    loadDeviceConfig
}