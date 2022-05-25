import { split } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSetWebRTC } from "./../../../redux/components/browser/browserSilce.js";
import { webrtc as config } from "./../../../constants/create";
import { useTranslation } from "react-i18next";


function formatWebRTC(webrtc, key, value) {
  key.map((itemKey, index) => {
    webrtc[itemKey] = value[index];
  });
  return webrtc;
}


function Webrct(props) {
    const [t, i18n] = useTranslation();
  const dispatch = useDispatch();

  const webRTCState = useSelector((state) => state.browserConfig.webRTC);

  let webRTCBehavior = webRTCState.behavior;
  let webRTCIP = webRTCState.ipPublic;
  let webRTCBase = webRTCState.base;
  let webRTCLocalIp = webRTCState.ipLocal;


  const handleSetWebRTCBehavior = (e) => {
    dispatch(
      handleSetWebRTC(formatWebRTC({...webRTCState},['behavior'],[e.target.value]))
    );
  };
  const handleSetWebRTCIPPublic = (e) => {
    dispatch(
      handleSetWebRTC(formatWebRTC({...webRTCState},['ipPublic'],[e.target.value]))
    );
  };
  const handleSetWebRTCIPLocal = (e) => {
    dispatch(
      handleSetWebRTC(formatWebRTC({...webRTCState},['ipLocal'],[e.target.value]))
    );
  };
  const handleSetwebRTCBase = (e) => {
    // let value = webRTCBase == "Fill IP" ? "Custom WebRTC" : "Fill IP";
    dispatch(
      handleSetWebRTC(formatWebRTC({...webRTCState},['base'],[e.target.checked?config.base.true:config.base.false]))
    );
  };

  return (
    <div className="card-inner" id="webrtc">
      <div className="preview-block">
        <span className="preview-title-lg overline-title">{t('WebRTC')}</span>
        <div className="btn-group d-block pb-2 behavior">
          <div className="custom-control custom-radio webrtc-group-input-type">
            <input
              type="radio"
              name="webrtcType"
              className="custom-control-input"
              id="webrtc-prompt"
              value={config.behavior.altered}
              defaultChecked={webRTCBehavior == config.behavior.altered}
              onChange={handleSetWebRTCBehavior}
            />
            <label className="input-type btn" htmlFor="webrtc-prompt">
              {t('Altered')}
            </label>
          </div>
          <div className="custom-control custom-radio webrtc-group-input-type">
            <input
              type="radio"
              name="webrtcType"
              className="custom-control-input"
              id="webrtc-allow"
              value={config.behavior.disable}
              defaultChecked={webRTCBehavior == config.behavior.disable}
              onChange={handleSetWebRTCBehavior}
            />
            <label className="input-type btn" htmlFor="webrtc-allow">
              {t('Disabled')}
            </label>
          </div>
          <div className="custom-control custom-radio webrtc-group-input-type">
            <input
              type="radio"
              name="webrtcType"
              className="custom-control-input"
              id="webrtc-block"
              value={config.behavior.real}
              defaultChecked={webRTCBehavior == config.behavior.real}
              onChange={handleSetWebRTCBehavior}
            />
            <label className="input-type btn" htmlFor="webrtc-block">
              {t('Real')}
            </label>
          </div>
        </div>

        {/* sub-text */}

        {webRTCBehavior == config.behavior.altered ? (
          <div className="group-sub-text mb-2 prompt">
            <span className="sub-text-icon">
              <i className="fas fa-check"></i>
            </span>
            <p className="sub-text">
              {t('WebRTCBehavior altered')}
            </p>
          </div>
        ) : (
          ""
        )}
        {webRTCBehavior == config.behavior.disable ? (
          <div className="group-sub-text mb-2 allow">
            <span className="sub-text-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
            <p className="sub-text">
              {t('WebRTCBehavior disable')}
            </p>
          </div>
        ) : (
          ""
        )}

        {webRTCBehavior == config.behavior.real ? (
          <div className="group-sub-text mb-2 allow">
            <span className="sub-text-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </span>
            <p className="sub-text">
              {t('WebRTCBehavior read')}
            </p>
          </div>
        ) : (
          ""
        )}

        {/* based IP */}
        {webRTCBehavior == config.behavior.altered ? (
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="webrtc-input-base"
              checked={webRTCBase == config.base.true}
              onChange={handleSetwebRTCBase}
            />
            <label className="custom-control-label" htmlFor="webrtc-input-base">
              {t('Fill WebRTC Public IP based on the IP.')}
            </label>
          </div>
        ) : (
          ""
        )}

        { webRTCBase == config.base.false && webRTCBehavior == config.behavior.altered ? (
          <div className="d-block pt-3">
            <div className="row gy-4 align-center">
              <div className="col-12">
                <p className="nk-block-des">
                  {t('Fill Timezone on browser profile start based on the external IP')}
                </p>
              </div>
            </div>
            <div className="form-group w-50">
              <label className="form-label" htmlFor="webrtc-public-ip">
                {t('Public Ip')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  id="webrtc-public-ip"
                  placeholder="Public Ip"
                  value={webRTCIP}
                  onChange={handleSetWebRTCIPPublic}
                />
              </div>
            </div>
            <div className="form-group w-50">
              <label className="form-label" htmlFor="webrtc-local-ip">
                {t('Local Ip')}
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  className="form-control"
                  id="webrtc-local-ip"
                  placeholder="Local Ip"
                  value={webRTCLocalIp}
                  onChange={handleSetWebRTCIPLocal}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Webrct;
