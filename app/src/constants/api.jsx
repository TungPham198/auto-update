/* ----- Domain ----- */

export const BASE_URL = window.api.configs.base_url;
export const BASE_URL_V1 = window.api.configs.base_url_v1;
// export const BASE_URL = "http://127.0.0.1:8000/v2";

/* ----- API Routes ----- */

//Authenticate
export const LOGIN = '/login';
export const REGISTER = '/register';
export const VERIFY = '/verify/otp';
export const RESENDOTP = '/verify/otp/resend';

// download
export const RESOURCES_DOWNLOAD = '/downloads';

// profiles
export const USER_DETAIL = '/user/detail';
export const PROFILE_TABLE = '/browser/list';
export const PROFILE_DUPLICATE = '/browser/duplicate/';
export const PROFILE_SHARED_TABLE = '/share/list';
export const SHARE_PROFILE_TABLE = '/share-retrieves';
export const RECYCLE_LIST = '/browser/recycle';
export const RESTORE_BROWSER = '/browser/restore';
export const BROWSER = '/browser';

// folder
export const FOLDER_TABLE = '/folder/list';
export const FOLDER_SHARED_TABLE = '/sharefolder/list';
export const ADD_FOLDER = '/folder';
export const ADD_PROFILE_TO_FOLDER = '/add-browser';
export const SHARE_FOLDER_TABLE = '/sharefolder/shared';
export const DELETE_FOLDER = '/folder/destroy';


// fingerprint
export const FINGERPRINT = '/fingerprint/new';

//share
export const SHARE = '/share';
export const UNSHARE = '/share/unshare';
export const SHARE_FOLDER = '/sharefolder';
export const UNSHARE_FOLDER = '/sharefolder/unshare';

//URL ipinfor.io
export const URL_IP_INFOR = 'https://ipinfo.io/widget';

//WEBGL
export const WEBGL = '/webgl';

// proxy
export const PROXY_TABLE = '/proxy/list';
export const PROXY = '/proxy';
export const DELETE_MULTIPLE_PROXY = '/proxy/destroy-multiple';
export const IMPORT_PROXY = '/proxy/insert';
export const ADD_PROXY = '/proxy';


// useragent
export const USER_AGENT = '/useragents';
