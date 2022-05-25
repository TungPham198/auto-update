import {toast} from "react-toastify";

const defaultToast = (response) => {
    if (response.hasOwnProperty('data')) {
        toast.success(response.data.title);
    } else {
        const data = response.response.data;
        if (data.content && Array.isArray(data.content) && data.content.length > 0) {
          data.content.forEach(function(element){
            toast.error(element);
          });
        } else {
          toast.error(data.title);
        }
    }
}

const fromMainToast = (data) => {
    if (data.type === "success") {
        if(data.hasOwnProperty("title")){
            toast.success(data.title);
        }else{
            toast.success(data.title);
        }
    } else {
        if(data.hasOwnProperty("title")){
            toast.error(data.title);
        }else{
            toast.error(data);
        }
    }
}

/**
 * Simple toast
 * @param {*} data 
 */
const simpleToast = (data) => {
    toast[data.hasOwnProperty('type') ? data.type : 'success'](data.title);
}

export default {
    defaultToast,
    fromMainToast,
    simpleToast,
};
