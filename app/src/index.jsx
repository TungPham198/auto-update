import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import i18n from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "Core/root";
import store, { history } from "Redux/store/store";
import ApiRequest from "./api/request";
import preloadConfig from "./components/preloadIpConfig";

import "./assets/css/dashlite.css";
import "./assets/css/skins/theme-egyptian.css";
import "./assets/css/custom.css";
import "./event/event.js";
import "./assets/css/line-awesome/css/line-awesome.min.css";
import "./assets/css/navbar.css";
import "./assets/css/libs/fontawesome-icons.css"; 

// Handle events when call api using axios.
ApiRequest.setupInterceptors(store);

// Hande load api config save to redux
preloadConfig.loadIpConfig(store);
preloadConfig.loadDeviceConfig(store);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Root store={store} history={history}></Root>
    </Suspense>
  </I18nextProvider>,
  document.getElementById("target")
);
