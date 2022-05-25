import axios from "axios";
import * as API_CONSTANTS from '../constants/api'

const register = (credentials) => {
    return axios.post(API_CONSTANTS.BASE_URL + API_CONSTANTS.REGISTER, credentials);
};

const login = async (credentials) => {
    return axios.post(API_CONSTANTS.BASE_URL + API_CONSTANTS.LOGIN, credentials)
};

const verify = async (credentials) => {
    return axios.post(API_CONSTANTS.BASE_URL + API_CONSTANTS.VERIFY, credentials)
};

const resendOTP = async (credentials) => {
    return axios.post(API_CONSTANTS.BASE_URL + API_CONSTANTS.RESENDOTP, credentials)
};

const logout = () => {
   
};

export default {
    register,
    login,
    logout,
    verify,
    resendOTP,
};
