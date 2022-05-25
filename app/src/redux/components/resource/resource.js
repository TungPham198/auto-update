import {createSlice} from "@reduxjs/toolkit";

const default_state = {
    orbita: false,
    default_profile: false,
    default_profile_name: "",
}
const resource = createSlice({
    name: "resource",
    initialState: default_state,
    reducers: {
        DownloadSuccessfully(state, action) {
            state.orbita = true;
            state.default_profile = true;
            state.default_profile_name = ""
        },
        CheckResourceDownload(state, action) {
            state.orbita = action.payload.orbita;
            state.default_profile = action.payload.default_profile;
            state.default_profile_name = action.payload.default_profile_name;
        },
    }
});

// Export actions
export const {DownloadSuccessfully, CheckResourceDownload} = resource.actions;

// Export reducer
export default resource.reducer;
