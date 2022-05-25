import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleSetTimezone } from "./../../../redux/components/browser/browserSilce.js";
import { timezone as config } from "../../../constants/create.jsx";
import { useTranslation } from "react-i18next";

function formatData(dataDefault, key, value) {
  dataDefault[key] = value;
  return dataDefault;
}

function Timezone(props) {
    const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const timzoneState = useSelector((state) => state.browserConfig.timezone);
  const timezones = config.data;

  const handleSetTimezoneIsSelected = (e) => {
    dispatch(handleSetTimezone(formatData({...timzoneState},'value',e.target.value)));
  };
  const handelIsTimezoneBased = (e) => {
    dispatch(
      handleSetTimezone(
        formatData(
          { ...timzoneState },
          "base",
          timzoneState.base == config.base.true
            ? config.base.false
            : config.base.true
        )
      )
    );
  };

  return (
    <div className="card-inner">
      <div className="preview-block">
        <span className="preview-title-lg overline-title">{t('Timezone')}</span>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="timezone-input"
            checked={timzoneState.base == config.base.true}
            onChange={handelIsTimezoneBased}
          />
          <label className="custom-control-label" htmlFor="timezone-input">
            {t('Fill timezone based on the IP')}
          </label>
        </div>
        {timzoneState.base == config.base.false ? (
          <div className="d-block pt-3">
            <div className="row gy-4 align-center">
              <div className="col-12">
                <p className="nk-block-des">
                  {t('Fill Timezone on browser profile start based on the external IP')}
                </p>
              </div>
            </div>
            <div className="form-group w-50">
              <label className="form-label" htmlFor="timezone-screen">
                {t('Screen resolution')}
              </label>
              <div className="form-control-wrap ">
                <div className="form-control-select">
                  <select
                    className="form-control"
                    id="timezone-screen"
                    onChange={handleSetTimezoneIsSelected}
                    value={timzoneState.value}>
                    {timezones.map((timezone, index) => (
                      <option key={index} value={timezone.timezone_name}>
                        {timezone.timezone_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row gy-4 align-center">
              <div className="col-12">
                <p className="text-soft">{t('Ofset UTC')}: {timzoneState.value}</p>
              </div>
            </div>
          </div>
        ):''}
      </div>
    </div>
  );
}

export default Timezone;
