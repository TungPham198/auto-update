import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../../components/defaultModal";
import { doNotTrack } from "../../../constants/create";
import {
    overview as overviewConfig,
    navigator as navigatorConfig,
} from "../../../constants/create";
import {
    handleSetDoNotTrack,
    handleSetHardwareConcurrency,
    handleSetMaxTouchPoint,
    handleSetPlatform,
    handleSetResolution,
    handleSetUserAgent,
} from "../../../redux/components/browser/browserSilce";
import ModalListLanguages from "../modals/modal-list-languages";
import FingerPrintService from "../../../service/fingerprint.service";
import MultiToast from "../../../components/defaultToast";
import Convert from "../../../components/convert_object";
import { useTranslation } from "react-i18next";

function Navigator(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const browserConfigState = useSelector((state) => state.browserConfig);
    const { isShowing, modalName, modalData, toggle } = useModal();
    const screenList = navigatorConfig.screenList;
    const harwarecore = navigatorConfig.harwarecore;

    const handleChangeScreen = (e) => {
        dispatch(handleSetResolution(e.target.value));
    };
    const handleChangeUseragentInput = (e) => {
        dispatch(handleSetUserAgent(e.target.value));
    };
    const handleChangDoNotTrack = (e) => {
        dispatch(handleSetDoNotTrack(e.target.value));
    };
    const handleChangFlatfrom = (e) => {
        dispatch(handleSetPlatform(e.target.value));
    };
    const handleChangeHardwareConcurrency = (e) => {
        dispatch(handleSetHardwareConcurrency(e.target.value));
    };
    const handleChangeMaxTouchPoint = (e) => {
        dispatch(handleSetMaxTouchPoint(e.target.value));
    };

    const handleGetNewUserAgent = async () => {
        const params = {
            platform: Convert.flatformToOSFull[browserConfigState.platform],
            browser_version: browserConfigState.version,
            oldUseragent: browserConfigState.userAgent,
        };
        await FingerPrintService.getUserAgent(params)
            .then((res) => {
                dispatch(handleSetUserAgent(res.data.content.useragent))
            })
            .catch((err) => {
                MultiToast.defaultToast(err);
            })
    }

    return (
        <div className="card-inner">
            <div className="form-group w-50">
                <label className="form-label" htmlFor="navigator-user-agent">
                    {t('User-Agent')}:
                </label>
                <div className="form-control-wrap d-flex gap-05">
                    <input
                        type="text"
                        className="form-control"
                        id="navigator-user-agent"
                        placeholder="User Agent"
                        disabled="disable"
                        value={browserConfigState.userAgent}
                        onChange={handleChangeUseragentInput}
                    />
                    <button className="btn btn-outline-success" onClick={handleGetNewUserAgent}>
                        <i className="fas fa-redo"></i>
                    </button>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="timezone-screen">
                    {t('Screen resolution')}:
                </label>
                <div className="form-control-wrap ">
                    <div className="form-control-select">
                        <select
                            className="form-control"
                            id="timezone-screen"
                            value={browserConfigState.resolution}
                            onChange={handleChangeScreen}>
                            {screenList.map((screenList, index) => (
                                <option key={index} value={screenList}>
                                    {screenList}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="navigator-operating-system">
                    {t('Platform')}:
                </label>
                <div className="form-control-wrap">
                    <ul className="custom-control-group">
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="navigator-platform"
                                    id="navigator-platform-window"
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.win
                                    }
                                    defaultValue={overviewConfig.platform.win}
                                    onChange={handleChangFlatfrom}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="navigator-platform-window">
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
                                    name="navigator-platform"
                                    id="navigator-platform-macos"
                                    defaultValue={overviewConfig.platform.mac}
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.mac
                                    }
                                    onChange={handleChangFlatfrom}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="navigator-platform-macos">
                                    <em className="fab fa-apple"></em>&nbsp;&nbsp;
                                    <span>MacOS</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-checkbox custom-control-pro no-control checked">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="navigator-platform"
                                    id="navigator-platform-linux"
                                    defaultValue={overviewConfig.platform.linux}
                                    checked={
                                        browserConfigState.platform == overviewConfig.platform.linux
                                    }
                                    onChange={handleChangFlatfrom}
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="navigator-platform-linux">
                                    <em className="fab fa-linux"></em>&nbsp;&nbsp;
                                    <span>{t('Linux')}</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="navigator-user-agent">
                    {t('Languages')}:
                </label>
                <div className="form-control-wrap d-flex gap-05">
                    <input
                        type="text"
                        className="form-control"
                        id="navigator-user-agent"
                        placeholder="User Agent"
                        disabled="disabled "
                        value={browserConfigState.languages.map((item, index) => {
                            return `${item.name}${item.value != 1 ? ";q=" + item.value : ""}`;
                        })}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => toggle(true, "languagesModal", null)}>
                        <i className="fas fa-edit"></i>
                    </button>
                </div>
            </div>
            <div className="form-group w-50">
                <label className="form-label" htmlFor="navigator-donottrack">
                    {t('Do Not Track')}:
                </label>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="navigator-doNotTrack"
                            className="custom-control-input"
                            id="doNotTrackOn"
                            value={doNotTrack.on}
                            defaultChecked={browserConfigState.doNotTrack == doNotTrack.on}
                            onChange={handleChangDoNotTrack}
                        />
                        <label className="input-type btn" htmlFor="doNotTrackOn">
                            {t('On')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="navigator-doNotTrack"
                            className="custom-control-input"
                            id="doNotTrackOff"
                            value={doNotTrack.off}
                            defaultChecked={browserConfigState.doNotTrack == doNotTrack.off}
                            onChange={handleChangDoNotTrack}
                        />
                        <label className="input-type btn" htmlFor="doNotTrackOff">
                            {t('Off')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="navigator-doNotTrack"
                            className="custom-control-input"
                            id="doNotTrackNot"
                            value={doNotTrack.notset}
                            defaultChecked={
                                browserConfigState.doNotTrack == doNotTrack.notset
                            }
                            onChange={handleChangDoNotTrack}
                        />
                        <label className="input-type btn" htmlFor="doNotTrackNot">
                            {t('Not set')}
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="ha">
                    {t('Hardware Concurrency')}:
                </label>
                <div className="form-control-wrap ">
                    <div className="form-control-select">
                        <select
                            className="form-control"
                            id="hardware-core"
                            value={browserConfigState.hardwareConcurrency}
                            onChange={handleChangeHardwareConcurrency}>
                            {harwarecore.map((harwarecore, index) => (
                                <option key={index} value={harwarecore}>
                                    {harwarecore}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group w-50">
                <label className="form-label" htmlFor="navigator-max-touch-point">
                    {t('Max Touch Points')}:
                </label>
                <div className="form-control-wrap d-flex gap-05">
                    <input
                        type="number"
                        className="form-control"
                        id="navigator-max-touch-point"
                        placeholder="User Agent"
                        value={browserConfigState.maxTouchPoint}
                        onChange={handleChangeMaxTouchPoint}
                    />
                </div>
            </div>
            <ModalListLanguages
                isShowing={isShowing}
                modalName={modalName}
                data={modalData}
                hide={() => {
                    toggle(false, "languagesModal");
                }}
            />
        </div>
    );
}

export default Navigator;
