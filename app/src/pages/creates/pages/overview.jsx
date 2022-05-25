import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    handleSetGeolocation,
    handleSetPlatform,
    handleSetProfileName,
    handleSetTimezone,
    handleSetWebRTC,
} from "../../../redux/components/browser/browserSilce";
import { handleChangeCreateTabActive } from "../../../redux/components/display/displayConfigSilce";
import iconObita from "./../../../assets/images/icons/icon_obita.png";
import {
    overview as overviewConfig,
    timezone as timezoneConfig,
    webrtc as webRTCConfig,
    geolocation as geolocationConfig,
} from "../../../constants/create";
import FingerPrintService from "../../../service/fingerprint.service";
import Convert from "../../../components/convert_object";
import { useTranslation } from "react-i18next";

// format data webRTC, timezone, geolocation
function formatData(dataDefault, keyChange, valueChange) {
    dataDefault[keyChange] = valueChange;
    return dataDefault;
}

function Overview(props) {
    const [t, i18n] = useTranslation();

    const dispatch = useDispatch();
    const browserConfigState = useSelector((state) => state.browserConfig);
    const userInfor = useSelector((state) => state.user);
    let isCheckboxBase =
        browserConfigState.timezone.base == timezoneConfig.base.true &&
        browserConfigState.webRTC.base == webRTCConfig.base.true &&
        browserConfigState.geolocation.base == geolocationConfig.base.true
        ;

    const handleChangeInputProfileName = (e) => {
        dispatch(handleSetProfileName(e.target.value));

    };
    const handleChangeInputPlatform = (e) => {
        dispatch(handleSetPlatform(e.target.value));
    };
    const handleClickEditProxySetting = (e) => {
        dispatch(handleChangeCreateTabActive("proxy"));
    };
    const handleClickSetTimezone = (e) => {
        e.preventDefault();
        dispatch(handleChangeCreateTabActive("timezone"));
    };
    const handleClickSetWebRTC = (e) => {
        e.preventDefault();
        dispatch(handleChangeCreateTabActive("webrtc"));
    };
    const handleClickSetGeolocation = (e) => {
        e.preventDefault();
        dispatch(handleChangeCreateTabActive("geolocation"));
    };
    const handleClickCheckboxBase = (e) => {
        // setIsCheckboxBase(!isCheckboxBase);
        dispatch(
            handleSetGeolocation(
                formatData(
                    { ...browserConfigState.geolocation },
                    "base",
                    geolocationConfig.base[!isCheckboxBase]
                )
            )
        );
        dispatch(
            handleSetTimezone(
                formatData(
                    { ...browserConfigState.timezone },
                    "base",
                    timezoneConfig.base[!isCheckboxBase]
                )
            )
        );
        dispatch(
            handleSetWebRTC(
                formatData(
                    { ...browserConfigState.webRTC },
                    "base",
                    webRTCConfig.base[!isCheckboxBase]
                )
            )
        );
    };

    const handleGetNewFingerPrint = () => {
        FingerPrintService.getNewFingerPrint(userInfor, dispatch, { os: Convert.flatformToOS[browserConfigState.platform] });
    }
    return (
        <div className="card-inner">
            <div className="form-group w-50">
                <label className="form-label" htmlFor="overview-profile-name">
                    {t('Browser profile name')}
                </label>
                <div className="form-control-wrap">
                    <input
                        type="text"
                        required
                        className="form-control"
                        id="overview-profile-name"
                        placeholder="Browser profile name"
                        value={browserConfigState.profileName}
                        onChange={handleChangeInputProfileName}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="overview-operating-system">
                    {t('Operating system')}:
                </label>
                <div className="form-control-wrap">
                    <ul className="custom-control-group">
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="overview-platform"
                                    id="overview-platform-window"
                                    defaultValue={overviewConfig.platform.win}
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.win
                                    }
                                    onChange={handleChangeInputPlatform}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="overview-platform-window">
                                    <em className="fab fa-windows"></em>&nbsp;&nbsp;
                                    <span>{t('Windows')}</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="overview-platform"
                                    id="overview-platform-macos"
                                    defaultValue={overviewConfig.platform.mac}
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.mac
                                    }
                                    onChange={handleChangeInputPlatform}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="overview-platform-macos">
                                    <em className="fab fa-apple"></em>&nbsp;&nbsp;
                                    <span>{t('MacOS')}</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control checked">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="overview-platform"
                                    id="overview-platform-linux"
                                    defaultValue={overviewConfig.platform.linux}
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.linux
                                    }
                                    onChange={handleChangeInputPlatform}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="overview-platform-linux">
                                    <em className="fab fa-linux"></em>&nbsp;&nbsp;
                                    <span>{t('Linux')}</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="group-sub-text mb-2 allow">
                <span className="sub-text-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                </span>
                <p className="sub-text">
                    {t('Overview sub text')}
                </p>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="webrtc-public-ip">
                    {t('Browser')}:
                </label>
                <div className="form-control-wrap">
                    <ul className="custom-control-group">
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="overview-browser"
                                    id="overview-browser"
                                    defaultValue="orbita"
                                    defaultChecked={browserConfigState.browser == "Orbita"}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="overview-browser">
                                    <img className="icon-btn" src={iconObita} alt="iconObita" />
                                    &nbsp;&nbsp;
                                    <span>{t('Orbita')}</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="webrtc-public-ip">
                    {t('Proxy settings')}:
                </label>
                <div className="form-control-wrap">
                    <button
                        className="btn btn-dim btn-primary"
                        onClick={handleClickEditProxySetting}>
                        {t('Edit proxy settings')}
                    </button>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="webrtc-public-ip">
                    {t('Start Url')}:
                </label>
                <div className="form-control-wrap">
                    <input
                        type="text"
                        className="form-control"
                        id="webrtc-public-ip"
                        placeholder="Start Url"
                        defaultValue={browserConfigState.StartURL}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="webrtc-public-ip">
                    {t('Timezone, WebRTC, Geolocation')}:
                </label>
                <div className="form-control-wrap">
                    <div className="custom-control custom-switch checked">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="uifbhcai"
                            checked={isCheckboxBase}
                            onChange={handleClickCheckboxBase}
                        />
                        <label className="custom-control-label" htmlFor="uifbhcai">
                            {t('Fill Timezone, WebRTC, and Geolocation fingerprints base on the external IP')}
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-group card card-bordered card-preview">
                <div className="card-inner">
                    <div className="overview-border-item d-flex justify-content-between align-items-center">
                        <div className="g">
                            <span className="title font-weight-bold">{t('Timezone')}</span>
                        </div>
                        <div className="overview-border-item-child d-flex align-items-center">
                            <div className="preview-icon-wrap">
                                {browserConfigState.timezone.base ==
                                    timezoneConfig.base.true ? (
                                    <i className="fas fa-check text-success"></i>
                                ) : (
                                    <i className="fas fa-exclamation-triangle text-danger"></i>
                                )}
                            </div>

                            <div className="preview-icon-wrap">
                                <i className="fas fa-sort-down"></i>
                            </div>
                            <div className="preview-icon-wrap">
                                <a
                                    href="#"
                                    className={`overview-border-item-child-btn btn ${browserConfigState.timezone.base == timezoneConfig.base.true
                                        ? ""
                                        : "text-danger"
                                        }`}
                                    onClick={handleClickSetTimezone}>
                                    {t('Edit')}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="overview-border-item d-flex justify-content-between align-items-center">
                        <div className="g">
                            <span className="title font-weight-bold">{t('WebRTC')}</span>
                        </div>
                        <div className="overview-border-item-child d-flex align-items-center">
                            <div className="preview-icon-wrap">
                                {browserConfigState.webRTC.base == webRTCConfig.base.true ? (
                                    <i className="fas fa-check text-success"></i>
                                ) : (
                                    <i className="fas fa-exclamation-triangle text-danger"></i>
                                )}
                            </div>

                            <div className="preview-icon-wrap">
                                <i className="fas fa-sort-down"></i>
                            </div>
                            {/* {browserConfigState.webRTC.base == webRTCConfig.base.true?():()} */}
                            <div className="preview-icon-wrap">
                                <a
                                    href="#"
                                    className={`overview-border-item-child-btn btn ${browserConfigState.webRTC.base == webRTCConfig.base.true
                                        ? ""
                                        : "text-danger"
                                        }`}
                                    onClick={handleClickSetWebRTC}>
                                    {t('Edit')}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="overview-border-item d-flex justify-content-between align-items-center">
                        <div className="g">
                            <span className="title font-weight-bold">{t('Geolocation')}</span>
                        </div>
                        <div className="overview-border-item-child d-flex align-items-center">
                            <div className="preview-icon-wrap">
                                {browserConfigState.geolocation.base ==
                                    geolocationConfig.base.true ? (
                                    <i className="fas fa-check text-success"></i>
                                ) : (
                                    <i className="fas fa-exclamation-triangle text-danger"></i>
                                )}
                            </div>
                            <div className="preview-icon-wrap">
                                <i className="fas fa-sort-down"></i>
                            </div>
                            <div className="preview-icon-wrap">
                                <a
                                    href="#"
                                    className={`overview-border-item-child-btn btn ${browserConfigState.geolocation.base ==
                                        geolocationConfig.base.true
                                        ? ""
                                        : "text-danger"
                                        }`}
                                    onClick={handleClickSetGeolocation}>
                                    {t('Edit')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group w-50">
                <div className="form-control-wrap">
                    <button className="btn btn-dim btn-primary" onClick={handleGetNewFingerPrint}>
                        {t('Get new fingerprint')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Overview;
