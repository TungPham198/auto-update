import axios from "axios";
import * as API_CONSTANTS from '../constants/api'
import DecryptService from "./decrypt.service";
import { handleSetFingerprint } from "../redux/components/browser/browserSilce";
import MultiToast from "../components/defaultToast";
import { handleLoadFingerPrint } from "../redux/components/display/displayConfigSilce";
import Convert from "../components/convert_object";


/**
 * Get new fingerprint
 * @param {*} userInfor 
 * @param {*} dispatch 
 * @param {*} params object
 */
const getNewFingerPrint = async (userInfor, dispatch, params) => {
    dispatch(handleLoadFingerPrint(true));
    await axios.get(API_CONSTANTS.BASE_URL + API_CONSTANTS.FINGERPRINT, { params: params })
        .then((response) => {
            const fingerprint = DecryptService.decryptAES(response.data.content);
            localStorage.setItem(`${userInfor.uuid}_fingerprint`, JSON.stringify(fingerprint));
            dispatch(handleSetFingerprint(fingerprint));

        })
        .catch(error => {
            MultiToast.defaultToast(error)
        }).finally(() => {
            dispatch(handleLoadFingerPrint(false));
        });
    dispatch(handleLoadFingerPrint(false));
}

/**
 * get webgl
 * @param {*} params 
 * @returns 
 */
const getWebGL = async (params) => {
    return await axios.get(API_CONSTANTS.BASE_URL_V1 + API_CONSTANTS.WEBGL, { params: params })
}

/**
 * user agent
 * @param {*} params 
 * @returns 
 */
const getUserAgent = async (params, headers) => {
    return await axios({
        url: API_CONSTANTS.BASE_URL_V1 + API_CONSTANTS.USER_AGENT,
        method: "get",
        params: params,
        headers: headers,
    });
}

const convertFingerPrintToConfig = (fingerprint, browserConfig) => {
    fingerprint = JSON.parse(fingerprint);
    let config = {
        "name": browserConfig.profileName,
        "version": parseInt(fingerprint.BROWSER_VERSION),
        "os": fingerprint.OS,
        "browser": fingerprint.BROWSER,
        "fingerprint": fingerprint.FINGERPRINT_DATA,
    }

    //fingerprint.navigator (navigator tab)
    config.fingerprint.navigator.hardwareConcurrency = parseInt(browserConfig.hardwareConcurrency);
    config.fingerprint.navigator.oscpu = null;
    config.fingerprint.navigator.buildID = null;
    config.fingerprint.navigator.doNotTrack = browserConfig.doNotTrack;
    config.fingerprint.navigator.maxTouchPoints = parseInt(browserConfig.maxTouchPoint);

    //fingerprint.screen (navigator tab)
    const screen = browserConfig.resolution.split("x");
    config.fingerprint.screen.width = parseInt(screen[0]);
    config.fingerprint.screen.height = parseInt(screen[1]);

    //fingerprint.webgl2 (hardware tab)
    config.fingerprint.webgl2.canvas = browserConfig.canvas; //canvas

    config.fingerprint.webgl2.audioContext = {};
    config.fingerprint.webgl2.audioContext.enable = browserConfig.audioContext == "noise" ? true : false; //audioContext

    config.fingerprint.webgl2.WebGLImage = browserConfig.webGLImage == "noise" ? true : false; //WEBGL IMAGE

    config.fingerprint.webgl2.WebGLMeta = browserConfig.webGLMetadataVendor == "noise" ? true : false;; //WEBGL METADATA
    config.fingerprint.webgl2.unmaskedVendor = browserConfig.webGLVendor;
    config.fingerprint.webgl2.unmaskedRenderer = browserConfig.webGLMetadataRenderer;

    //fingerprint.languages (navigator tab)
    config.fingerprint.languages.acceptLanguage = Convert.objectLanguageToString(browserConfig.languages);

    //fingerprint.timezone (Overview tab)
    config.fingerprint.timezone = {};
    config.fingerprint.timezone.isProxy = browserConfig.timezone.base == "Fill IP" ? true : false;
    config.fingerprint.timezone.nameTimezone = browserConfig.timezone.value;

    //fingerprint.webrtc (Overview tab)
    config.fingerprint.webrtc = {};
    config.fingerprint.webrtc.fill_based_on_ip = browserConfig.webRTC.base == "Fill IP" ? true : false;
    config.fingerprint.webrtc.localIps = browserConfig.webRTC.ipLocal;
    config.fingerprint.webrtc.local_ip_masking = true;
    config.fingerprint.webrtc.mode = browserConfig.webRTC.behavior == "disabled" ? 'block' : browserConfig.webRTC.behavior;
    config.fingerprint.webrtc.publicIP = browserConfig.webRTC.ipPublic;
    config.fingerprint.webrtc.public_ip = null;

    //fingerprint.mediaDevices (Overview tab)
    config.fingerprint.mediaDevices = {};
    config.fingerprint.mediaDevices.enableMasking = browserConfig.mediaDevice.isEnableMask;
    config.fingerprint.mediaDevices.videoInputs = browserConfig.mediaDevice.videoInput;
    config.fingerprint.mediaDevices.audioInputs = browserConfig.mediaDevice.audioInput;
    config.fingerprint.mediaDevices.audioOutputs = browserConfig.mediaDevice.audioOutput;
    config.fingerprint.mediaDevices.uid = null;

    //fingerprint.geoLocation (geoLocation tab)
    config.fingerprint.geoLocation = {};
    config.fingerprint.geoLocation.mode = browserConfig.geolocation.behavior == "allow" ? 'real' : browserConfig.geolocation.behavior;
    config.fingerprint.geoLocation.latitude = parseFloat(browserConfig.geolocation.lat);
    config.fingerprint.geoLocation.longitude = parseFloat(browserConfig.geolocation.long);
    config.fingerprint.geoLocation.accuracy = parseInt(browserConfig.geolocation.accuracy);
    config.fingerprint.geoLocation.isProxy = browserConfig.geolocation.base == "Fill IP" ? true : false;

    //proxy
    config.fingerprint.proxy = {};
    config.fingerprint.proxy.IsProxy = true;
    config.fingerprint.proxy.ProxyType = "NONE";

    //another
    config.fingerprint.storage = null;
    config.fingerprint.StartURL = browserConfig.StartURL;
    config.fingerprint.Uid = null;
    config.fingerprint.CanvasModel = null;
    config.fingerprint.canvasNoise = parseFloat(0.385973641); 

    config.fingerprint.plugins = {}; 
    config.fingerprint.plugins.all_enable = true; 
    config.fingerprint.plugins.flash_enable = true; 
    config.fingerprint.exxtension = null; 

    return config;
}

export default {
    getNewFingerPrint,
    getWebGL,
    convertFingerPrintToConfig
};