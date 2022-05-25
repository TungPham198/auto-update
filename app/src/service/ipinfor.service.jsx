import * as API_CONSTANTS from '../constants/api'

const getIpInfor = async () => {

    const param = {
        urlCheckInfor: API_CONSTANTS.URL_IP_INFOR,
        options: {
            headers: {
                "Referer": "https://ipinfo.io/",
                "Accept-Language": "en-US,en;q=0.5",
                "Access-Control-Allow-Origin": "*"
            },
        },
    }

    return await window.electronAPI.getInfoIp(param)
}

const getDeviceInfo = async()=>{
    return await window.electronAPI.getInfoDevice();
}

export default {
    getIpInfor,
    getDeviceInfo
};