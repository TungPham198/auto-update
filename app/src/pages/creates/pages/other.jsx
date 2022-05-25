import React from "react";
import { useTranslation } from "react-i18next";

function other(props) {
    const [t, i18n] = useTranslation();
  return (
    <h1>{t('Other')}</h1>
  );
}

export default other;
