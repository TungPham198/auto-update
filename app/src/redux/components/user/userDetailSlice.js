import { createSlice } from "@reduxjs/toolkit";
import { writeConfigRequest, deleteConfigRequest } from "secure-electron-store";

const default_state = {
  uuid: null,
  name: null,
  email: null,
  browser_total: null,
  setting: null,
  default_settings: null,
  created_at: null
}

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: default_state,
  reducers: {
    UserDetails(state, action) {
      state.uuid = action.payload.uuid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.browser_total = action.payload.browser_total;
      state.setting = action.payload.setting;
      state.default_settings = action.payload.default_settings;
      state.created_at = action.payload.created_at;
    }
  }
});

// Export actions
export const { UserDetails} = userDetailSlice.actions;

// Export reducer
export default userDetailSlice.reducer;
