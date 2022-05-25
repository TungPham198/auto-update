import axios from "axios";
import * as API_CONSTANTS from '../constants/api'

/**
 * create new browser
 * @param {*} params 
 * @returns 
 */
const createBrowser = async (body) => {
    var bodyFormData = new FormData();
    bodyFormData.append('config',  JSON.stringify(body));
    return await axios.post(API_CONSTANTS.BASE_URL_V1 + API_CONSTANTS.BROWSER, bodyFormData)
}

export default {
    createBrowser,
};