import axios from "axios";
import * as API_CONSTANTS from '../constants/api'

const getInforDefault = () => {
    return axios.get(API_CONSTANTS.BASE_URL_V1 + API_CONSTANTS.USER_DETAIL);
};

export default {
    getInforDefault,
};