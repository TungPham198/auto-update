import { createSlice } from "@reduxjs/toolkit";
import { split } from "lodash";
import replaceLanguages from "../../../components/replaceLanguages"

const default_state = {
    version: '',
    profileName: '',
    proxy: {
        uuid: "964579f6-d6b1-4d87-9291-6df8d96abd031",
        title: "s1",
        ip: "45.58.61.166",
        port: "22",
        user: "proxysock",
        pass: "ZJXPuB9uqN",
        type: "Without proxy",
        country: "US",
        note: "",
        details: {
            ip: "45.58.61.166",
            asn: {
                asn: "AS201106",
                name: "Spartan Host Ltd",
                type: "hosting",
                route: "45.58.61.0/24",
                domain: "spartanhost.org",
            },
            loc: "32.8152,-96.8703",
            org: "AS201106 Spartan Host Ltd",
            city: "Dallas",
            postal: "75247",
            region: "Texas",
            country: "US",
            hostname: "kmdczy.ml",
            timezone: "America/Chicago",
        },
        browsers_count: 0,
        created_at: "2022-05-11T06:43:51.000000Z",
    },
    browser: 'Orbita',
    userAgent: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
    resolution: '1600x900',
    languages: [
        { name: 'en-us', value: 1 },
        { name: 'en', value: 0.9 },
        { name: 'vi', value: 0.8 },
    ],
    platform: 'Win32',
    timezone: {
        value: '',// => timezone.nameTimezone
        base: 'Fill IP' // => timezone.isProxy
    },
    geolocation: {
        accuracy: 100,  
        behavior: 'prompt', // => geoLocation.longitude
        lat: '21.0245', // => geoLocation.latitude
        long: '105.8412', // => geoLocation.longitude
        base: 'Fill IP'   // => geoLocation.mode
    },
    webRTC: {
        behavior: 'public', // => webrtc.mode 
        ipPublic: '', // => webrtc.publicIP 
        ipLocal: '', // => webrtc.localIps 
        base: 'Fill IP' // => webrtc.fill_based_on_ip 
    },
    canvas: 'noise', // => webgl2.canvas
    webGLMetadata: 'noise',
    webGLMetadataVendor: 'noise',
    webGLVendor: '',// => webgl2.unmaskedVendor
    webGLMetadataRenderer: '', // => webgl2.unmaskedRenderer
    webGLImage: 'noise',
    audioContext: 'noise', //webgl2.audioContext.enable
    mediaDevice: {
        isEnableMask: false,
        videoInput: 1,
        audioInput: 1,
        audioOutput: 1,
    },
    doNotTrack: 'off',  // => navigator.doNotTrack 
    hardwareConcurrency: 2, // => navigator.hardwareConcurrency 
    maxTouchPoint: 2,
    StartURL: 'https://info.multibrowser.io/',
    font: {
        isEnable: true,
        value: [
            "Andale Mono",
            "Arial",
            "Arial Black",
            "Arial Hebrew",
            "Arial Narrow",
            "Arial Rounded MT Bold",
            "Arial Unicode MS",
            "Book Antiqua",
            "Bookman Old Style",
            "Calibri",
            "Cambria",
            "Cambria Math",
            "Century",
            "Century Gothic",
            "Century Schoolbook",
            "Comic Sans MS",
            "Consolas",
            "Courier",
            "Courier New",
            "Geneva",
            "Georgia",
            "Helvetica",
            "Helvetica Neue",
            "Impact",
            "Lucida Bright",
            "Lucida Calligraphy",
            "Lucida Console",
            "Lucida Fax",
            "LUCIDA GRANDE",
            "Lucida Handwriting",
            "Lucida Sans",
            "Lucida Sans Typewriter",
            "Lucida Sans Unicode",
            "Microsoft Sans Serif",
            "Monaco",
            "Monotype Corsiva",
            "MS Gothic",
            "MS PGothic",
            "MS Reference Sans Serif",
            "Palatino",
            "Palatino Linotype",
            "Tahoma",
            "Times",
            "Times New Roman",
            "Trebuchet MS",
            "Verdana",
            "Wingdings",
            "Wingdings 2",
            "Wingdings 3",
            "Abadi MT Condensed Light",
            "American Typewriter",
            "Apple Chancery",
            "Apple Color Emoji",
            "Apple SD Gothic Neo",
            "AVENIR",
            "Ayuthaya",
            "Bangla Sangam MN",
            "Baskerville",
            "Baskerville Old Face",
            "Batang",
            "Bauhaus 93",
            "Bell MT",
            "Bernard MT Condensed",
            "Big Caslon",
            "Bodoni 72",
            "Bodoni 72 Oldstyle",
            "Bodoni 72 Smallcaps",
            "Bookshelf Symbol 7",
            "Bradley Hand",
            "Britannic Bold",
            "Brush Script MT",
            "Calisto MT",
            "Candara",
            "Chalkboard",
            "Chalkboard SE",
            "Chalkduster",
            "Cochin",
            "Colonna MT",
            "Constantia",
            "Cooper Black",
            "Copperplate",
            "Copperplate Gothic Bold",
            "Copperplate Gothic Light",
            "Corbel",
            "Curlz MT",
            "Didot",
            "Edwardian Script ITC",
            "Engravers MT",
            "Euphemia UCAS",
            "EUROSTILE",
            "Footlight MT Light",
            "Futura",
            "Gabriola",
            "Geeza Pro",
            "Gill Sans",
            "Gill Sans MT",
            "Gloucester MT Extra Condensed",
            "Goudy Old Style",
            "Gujarati Sangam MN",
            "Gulim",
            "Gurmukhi MN",
            "Haettenschweiler",
            "Harrington",
            "Heiti SC",
            "Heiti TC",
            "Hiragino Kaku Gothic ProN",
            "Hiragino Mincho ProN",
            "Hoefler Text",
            "Imprint MT Shadow",
            "Kailasa",
            "Kannada Sangam MN",
            "Krungthep",
            "Malayalam Sangam MN",
            "Marion",
            "Marker Felt",
            "Marlett",
            "Matura MT Script Capitals",
            "Meiryo",
            "Microsoft Himalaya",
            "Microsoft Tai Le",
            "Microsoft Yi Baiti",
            "MingLiU",
            "MingLiU_HKSCS",
            "MingLiU_HKSCS-ExtB",
            "MingLiU-ExtB",
            "Mistral",
            "Modern No. 20",
            "Mongolian Baiti",
            "MS Mincho",
            "MS PMincho",
            "MS Reference Specialty",
            "MT Extra",
            "Nadeem",
            "Noteworthy",
            "Onyx",
            "OPTIMA",
            "Oriya Sangam MN",
            "OSAKA",
            "Papyrus",
            "Perpetua",
            "Perpetua Titling MT",
            "Plantagenet Cherokee",
            "Playbill",
            "PMingLiU",
            "PMingLiU-ExtB",
            "Rockwell",
            "Rockwell Extra Bold",
            "Savoye LET",
            "SimHei",
            "SimSun",
            "SimSun-ExtB",
            "Sinhala Sangam MN",
            "Skia",
            "Snell Roundhand",
            "Stencil",
            "Tamil Sangam MN",
            "Telugu Sangam MN",
            "Thonburi",
            "Tw Cen MT",
            "Wide Latin",
            "Zapfino"
        ]
    },
    extension: {
        isCustom: true,
        path: []
    }
}

const browserSlide = createSlice({
    name: "browserconfig",
    initialState: default_state,
    reducers: {
        handleSetTimezone: (state, action) => {
            state.timezone = action.payload
        },
        handleSetWebRTC: (state, action) => {
            state.webRTC = action.payload
        },
        handleSetGeolocation: (state, action) => {
            state.geolocation = action.payload
        },
        handleSetProxy: (state, action) => {
            state.proxy = action.payload
        },
        handleSetProfileName: (state, action) => {
            state.profileName = action.payload
        },
        handleSetPlatform: (state, action) => {
            state.platform = action.payload
        },
        handleSetLanguages: (state, action) => {
            state.languages = action.payload
        },
        handleSetResolution: (state, action) => {
            state.resolution = action.payload
        },
        handleSetUserAgent: (state, action) => {
            state.userAgent = action.payload
        },
        handleSetDoNotTrack: (state, action) => {
            state.doNotTrack = action.payload
        },
        handleSetHardwareConcurrency: (state, action) => {
            state.hardwareConcurrency = action.payload
        },
        handleSetMaxTouchPoint: (state, action) => {
            state.maxTouchPoint = action.payload
        },
        handleSetFingerprint: (state, action) => {
            state.version = action.payload.BROWSER_VERSION;

            const fingerprint = action.payload.FINGERPRINT_DATA;
            state.userAgent = fingerprint.navigator.userAgent;
            state.resolution = `${fingerprint.screen.width}x${fingerprint.screen.height}`;
            state.languages = replaceLanguages.stringToArray(fingerprint.languages.acceptLanguage);
            /* state.platform = fingerprint.navigator.platform; */
            state.webRTC.ipLocal = fingerprint.webRtcLocalIps;
            state.hardwareConcurrency = fingerprint.navigator.hardwareConcurrency;
            state.maxTouchPoint = fingerprint.navigator.maxTouchPoints;

            state.webGLVendor = fingerprint.webgl2.unmaskedVendor;
            state.webGLMetadataRenderer = fingerprint.webgl2.unmaskedRenderer;
        },
        handleSetFont: (state, action) => {
            state.font = action.payload
        },
        handleSetMediaDevice: (state, action) => {
            state.mediaDevice = action.payload
        },
        handleSetCanvas: (state, action) => {
            state.canvas = action.payload
        },
        handleSetAudioContext: (state, action) => {
            state.audioContext = action.payload
        },
        handleSetWebGLImage: (state, action) => {
            state.webGLImage = action.payload
        },
        handleSetWebGLMetatdata: (state, action) => {
            state.webGLMetadataVendor = action.payload
        },
        handleSetExtension: (state, action) => {
            if (action.payload.key == 'path') {
                let index = state.extension.path.indexOf(action.payload.value);
                if (index == -1) {
                    state.extension.path.push(action.payload.value)
                }
            }
            else if (action.payload.key == 'isCustom') {
                state.extension.isCustom = action.payload.value
            }
            else if (action.payload.key == 'deletePath') {
                let index = state.extension.path.indexOf(action.payload.value);
                // console.log(index,action.payload.value);
                if (index !== -1) {
                    state.extension.path.splice(index, 1);
                  }
            }
        },
        handleSetTimezoneWebRTCGeolocation:(state, action) => {
            const data = action.payload;
            //Timezone
            state.timezone.value = data.timezone

            //WebRTC
            state.webRTC.ipPublic = data.ip

            //Geolocation
            const latLong = data.loc.split(',');
            state.geolocation.lat = latLong[0];
            state.geolocation.long = latLong[1];
        },
        handleSetWebGLVendor: (state, action) => {
            state.webGLVendor = action.payload
        },
        handleSetWebGLMetadataRenderer: (state, action) => {
            state.webGLMetadataRenderer = action.payload
        },
    }
});

// Export actions
export const {
    handleSetTimezone,
    handleSetWebRTC,
    handleSetGeolocation,
    handleSetProxy,
    handleSetProfileName,
    handleSetPlatform,
    handleSetLanguages,
    handleSetResolution,
    handleSetUserAgent,
    handleSetDoNotTrack,
    handleSetHardwareConcurrency,
    handleSetMaxTouchPoint,
    handleSetFingerprint,
    handleSetFont,
    handleSetMediaDevice,
    handleSetCanvas,
    handleSetAudioContext,
    handleSetWebGLImage,
    handleSetWebGLMetatdata,
    handleSetExtension,
    handleSetTimezoneWebRTCGeolocation,
    handleSetWebGLVendor,
    handleSetWebGLMetadataRenderer,
} = browserSlide.actions;
//
export const browserConfig = state => state.browserconfig;

// Export reducer
export default browserSlide.reducer;
