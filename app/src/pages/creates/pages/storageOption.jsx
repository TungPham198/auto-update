import React from "react";
import { useTranslation } from "react-i18next";

function StorageOption(props) {
    const [t, i18n] = useTranslation();
  return (
    <h1>{t('Storage Option')}</h1>
  );
}

export default StorageOption;
