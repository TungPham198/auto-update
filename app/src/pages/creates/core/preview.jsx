import { t } from "i18next";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Preview(props) {
    const [t, i18n] = useTranslation();
    const config = useSelector((state) => state.browserConfig);

    return (
        <Fragment>
            <h3 className="nk-block-title pt-3 text-center">{t('Profile Summary')}</h3>
            <table className="table">
                <tbody>
                    <tr className="row">
                        <td className="col-5">{t('Profile name')}: </td>
                        <td className="col-7">{config.profileName}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Proxy')}: </td>
                        <td className="col-7">
                            {config.proxy.type == "Without proxy"
                                ? "Without proxy"
                                : `${config.proxy.ip ? config.proxy.ip : ""} : ${config.proxy.port
                                } / ${config.proxy.type}`}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Browser')}</td>
                        <td className="col-7">{config.browser}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('User-agent')}</td>
                        <td className="col-7">{config.userAgent}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Resolution')}</td>
                        <td className="col-7">{config.resolution}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Languages')}</td>
                        <td className="col-7">
                            {config.languages.map((item, index) =>
                                `${item.name}${item.value != 1 ? ";q=" + item.value + (index < (config.languages.length - 1) ? ',' : '') : (index < (config.languages.length - 1) ? ',' : '')}`
                            )}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Platform')}</td>
                        <td className="col-7">{config.platform}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Timezone')}</td>
                        <td className="col-7">{`${config.timezone.value} [${config.timezone.base}]`}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Geolocation')}</td>
                        <td className="col-7">{`[${config.geolocation.behavior}] ${config.geolocation.lat} - ${config.geolocation.long} [${config.geolocation.base}]`}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('WebRTC')}</td>
                        <td className="col-7">{`[${config.webRTC.behavior}] ${config.webRTC.ipPublic} [${config.webRTC.base}]`}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Canvas')}</td>
                        <td className="col-7">{config.canvas}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('WebGL metadata')}</td>
                        <td className="col-7">{config.webGLMetadata}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('WebGL metadata vendor')}</td>
                        <td className="col-7">{config.webGLMetadataVendor}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('WebGL metadata renderer')}</td>
                        <td className="col-7">{config.webGLMetadataRenderer}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('WebGL image')}</td>
                        <td className="col-7">{config.webGLImage}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Audio Context')}</td>
                        <td className="col-7">{config.audioContext}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Font')}</td>
                        <td className="col-7">{t('Total')}: {config.font.value.length}</td>
                    </tr>
                    <tr className="row">
                        <td className="col-5">{t('Media device')}</td>
                        <td className="col-7">{`${config.mediaDevice.isEnableMask}|${config.mediaDevice.videoInput}|${config.mediaDevice.audioInput}|${config.mediaDevice.audioOutput}`}</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
export default Preview;
