import { createSlice } from "@reduxjs/toolkit";

const default_state = {
    ip: null,
    hostname: null,
    city: null,
    region: null,
    country: null,
    loc: null,
    org: null,
    postal: null,
    timezone: null,
};

const ipInfoConfig = createSlice({
    name: "ipinfoconfig",
    initialState: default_state,
    reducers: {
        handleSetIpInfo: (state, action) => {
            state.ip = action.payload.ip;
            state.hostname = action.payload.hostname;
            state.city = action.payload.city;
            state.region = action.payload.region;
            state.country = action.payload.country;
            state.loc = action.payload.loc;
            state.org = action.payload.org;
            state.postal = action.payload.postal;
            state.timezone = action.payload.timezone;
        },

    },
});

// Export actions
export const {
    handleSetIpInfo
} =
    ipInfoConfig.actions;

// Export reducer
export default ipInfoConfig.reducer;
