import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import userReducer from "../components/user/userSlice";
import userDetailsReducer from "../components/user/userDetailSlice";
import resource from "../components/resource/resource";
import browserSilce from "../components/browser/browserSilce";
import browserController from "../components/browser/browserControllerSlice";
import displayConfigSilce from "../components/display/displayConfigSilce";
import ipInfoConfigSlice from "../components/ipinfo/ipInfoConfigSlice";
import deviceInfoConfigSlice from "../components/deviceinfo/deviceInfoConfigSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    userDetails: userDetailsReducer,
    resource: resource,
    browserConfig: browserSilce,
    browserController: browserController,
    displayConfig: displayConfigSilce,
    ipInfoConfig: ipInfoConfigSlice,
    deviceInfoConfig: deviceInfoConfigSlice,
  });

export default rootReducer;
