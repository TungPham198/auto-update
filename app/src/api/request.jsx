import axios from 'axios';

import { LogOut } from "../redux/components/user/userSlice";
import { toast } from "react-toastify";
import MultiToast from '../components/defaultToast';

const setupInterceptors = (store) => {

    /* Add a request interceptor */
    axios.interceptors.request.use(function (config) {

        /*  Add token after request*/
        const token = store.getState().user.token;
        if (token) {
            config.headers.Authorization = `${token}`
        }
        config.headers.Accept = 'application/json';

        return config;

    }, function (error) {
        return Promise.reject(error);
    });

    /*  Add a response interceptor */
    axios.interceptors.response.use((response) => {

        return response;
    }, (error) => {

        /*  Handle Network  */
        if (!error.response) {
            MultiToast.simpleToast({type:'error', title: "Network Error" })
        }

        /*  Handle token  */
        
        if (error.response.data.title === "Unauthenticated." && error.response.status === 401) {
            // MultiToast.simpleToast({type:'error', title: "Unauthenticated" })
            store.dispatch(LogOut());
        }

        /*  Handle 439 to many request  */
        if (error.response.status === 429) {
            MultiToast.simpleToast({type:'error', title: "Too Many Requests." })
        }

        return Promise.reject(error);
    });
}
export default { setupInterceptors };