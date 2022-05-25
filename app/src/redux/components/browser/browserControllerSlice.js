import {createSlice} from "@reduxjs/toolkit";

const default_state = {
    list: JSON.parse(localStorage.getItem("browserController")) || {}
}
const browserControllerSlice = createSlice({
    name: "browserController",
    initialState: default_state,
    reducers: {
        AddBrowser(state, action) {
            const new_list = {
                ...state.list,
                [action.payload.uuid]: action.payload.data
            }
            localStorage.setItem("browserController", JSON.stringify(new_list))
            state.list = new_list
        },
        RemoveBrowser(state, action) {
            delete state.list[action.payload.uuid]
            localStorage.setItem("browserController", JSON.stringify(state.list))
        },
    }
});

// Export actions
export const {AddBrowser, RemoveBrowser} = browserControllerSlice.actions;

// Export reducer
export default browserControllerSlice.reducer;
