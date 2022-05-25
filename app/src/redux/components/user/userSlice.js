import {createSlice} from "@reduxjs/toolkit";
import {writeConfigRequest,useConfigInMainResponse, deleteConfigRequest, useConfigInMainRequest} from "secure-electron-store";

const default_state = {
    isAuthUser: false,
    token: null,
    uuid: null,
    action: null,
}
window.api.store.send(useConfigInMainRequest);
const userSlide = createSlice({
  name: "user",
  initialState: window.api.store.initial()["userlogin"] !== undefined ? window.api.store.initial()["userlogin"] : default_state,
  reducers: {
    LoginAction(state, action) {
      window.api.store.send(writeConfigRequest, "userlogin", action.payload);
      state.isAuthUser = action.payload.isAuthUser;
      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
    },
    LogOut(state, action) {
      window.api.store.send(deleteConfigRequest, "userlogin");
      state.isAuthUser = default_state.isAuthUser;
      state.token = default_state.token;
      state.uuid = default_state.uuid;
    },
    RegisterAction(state, action) {
      state.uuid = action.payload.uuid;
      state.action = action.payload.action
    },
    VerifyAction(state, action) {
      state.isAuthUser = action.payload.isAuthUser;
      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
    },
    ChangeAction(state,action){
        state.action = action.payload.action
        state.uuid = action.payload.uuid
    }

    }
});

// Export actions
export const {
    LoginAction,
    LogOut,
    RegisterAction,
    VerifyAction,
    ChangeAction
} = userSlide.actions;

// Export reducer
export default userSlide.reducer;
