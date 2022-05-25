import { createSlice } from "@reduxjs/toolkit";

const default_state = {
    displaying_processor_name: null,
    machine_name: null,
    os_type: null,
    platform: null,
    ram: null,
};

const deviceInfoConfig = createSlice({
    name: "deviceinfoconfig",
    initialState: default_state,
    reducers: {
        handleSetDeviceInfo: (state, action) => {
            state.displaying_processor_name = action.payload.displaying_processor_name;
            state.machine_name = action.payload.machine_name;
            state.os_type = action.payload.os_type;
            state.platform = action.payload.platform;
            state.ram = action.payload.ram;
        },

    },
});

// Export actions
export const {
    handleSetDeviceInfo
} =
    deviceInfoConfig.actions;

// Export reducer
export default deviceInfoConfig.reducer;
