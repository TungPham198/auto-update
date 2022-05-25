import loadable from "@loadable/component";

export const navList = [
  {
    NavName: "Overview",
    NavHref: "overview",
    component: loadable(() => import("Pages/creates/pages/overview")),
  },
  {
    NavName: "Proxy",
    NavHref: "proxy",
    component: loadable(() => import("Pages/creates/pages/proxy")),
  },
  {
    NavName: "Timezone",
    NavHref: "timezone",
    component: loadable(() => import("Pages/creates/pages/timezone")),
  },
  {
    NavName: "WebRTC",
    NavHref: "webrtc",
    component: loadable(() => import("Pages/creates/pages/webrtc")),
  },
  {
    NavName: "Geolocation",
    NavHref: "geolocation",
    component: loadable(() => import("Pages/creates/pages/geolocation")),
  },
];

export const navAdvanceList = [
  {
    NavName: "Navigator",
    NavHref: "navigator",
    component: loadable(() => import("Pages/creates/pages/navigator")),
  },
  {
    NavName: "Font",
    NavHref: "font",
    component: loadable(() => import("Pages/creates/pages/font")),
  },
  {
    NavName: "Media Device",
    NavHref: "media_device",
    component: loadable(() => import("Pages/creates/pages/media_device")),
  },
  {
    NavName: "Hardware",
    NavHref: "hardware",
    component: loadable(() => import("Pages/creates/pages/hardware")),
  },
  //
  {
    NavName: "Extension",
    NavHref: "extension",
    component: loadable(() => import("Pages/creates/pages/extension")),
  },
/*   {
    NavName: "Storage Option",
    NavHref: "storageOption",
    component: loadable(() => import("Pages/creates/pages/storageOption")),
  },
  {
    NavName: "Browser Plugins",
    NavHref: "browser_plugins",
    component: loadable(() => import("Pages/creates/pages/browser_plugins")),
  },
  {
    NavName: "Other",
    NavHref: "other",
    component: loadable(() => import("Pages/creates/pages/other")),
  }, */
];
