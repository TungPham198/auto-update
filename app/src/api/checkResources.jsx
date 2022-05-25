import axios from 'axios';

import * as API_CONSTANTS from '../constants/api'

const checkResources = async () => {
    return await axios.get(API_CONSTANTS.BASE_URL + API_CONSTANTS.RESOURCES_DOWNLOAD + "/"+window.api.os.platform()+".json");
}
export default {checkResources};