import React from "react";
import { useTranslation } from "react-i18next";

function Browser_plugins(props) {
    const [t, i18n] = useTranslation();
  return (
    <h1>{t('Browser Plugins')}</h1>
  );
}

export default Browser_plugins;
