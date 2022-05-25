import { createSlice } from "@reduxjs/toolkit";

const default_state = {
  // createTabActive: 'extension',
  createTabActive: "overview",
  loadFingerPrint: false,
};

const displayConfigSilce = createSlice({
  name: "displayconfig",
  initialState: default_state,
  reducers: {
    handleChangeCreateTabActive: (state, action) => {
      state.createTabActive = action.payload;
    },
    handleLoadFingerPrint: (state, action) => {
      state.loadFingerPrint = action.payload;
    },
  },
});

// Export actions
export const { handleChangeCreateTabActive, handleLoadFingerPrint } =
  displayConfigSilce.actions;

// Export reducer
export default displayConfigSilce.reducer;
