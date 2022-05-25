import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { mediaDevice } from "../../../constants/create";
import { handleSetMediaDevice } from "../../../redux/components/browser/browserSilce";

function MediaDevice(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const mediaDeviceConfigState = useSelector((state) => state.browserConfig.mediaDevice);

    const handleChangeInputMediaDeviceMask = (e) => {
        let status = e.target.checked ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput,
            audioInput: mediaDeviceConfigState.audioInput,
            audioOutput: mediaDeviceConfigState.audioOutput,
        }))
    }

    const handleChangeVideoInputDown = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput == 0 ? 0 : mediaDeviceConfigState.videoInput - 1,
            audioInput: mediaDeviceConfigState.audioInput,
            audioOutput: mediaDeviceConfigState.audioOutput,
        }))
    }
    const handleChangeVideoInputUp = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput == 10 ? 10 : mediaDeviceConfigState.videoInput + 1,
            audioInput: mediaDeviceConfigState.audioInput,
            audioOutput: mediaDeviceConfigState.audioOutput,
        }))
    }
    const handleChangeAudioInputDown = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput,
            audioInput: mediaDeviceConfigState.audioInput == 0 ? 0 : mediaDeviceConfigState.audioInput - 1,
            audioOutput: mediaDeviceConfigState.audioOutput,
        }))
    }
    const handleChangeAudioInputUp = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput,
            audioInput: mediaDeviceConfigState.audioInput == 10 ? 10 : mediaDeviceConfigState.audioInput + 1,
            audioOutput: mediaDeviceConfigState.audioOutput,
        }))
    }
    const handleChangeAudioOutputDown = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput,
            audioInput: mediaDeviceConfigState.audioInput,
            audioOutput: mediaDeviceConfigState.audioOutput == 0 ? 0 : mediaDeviceConfigState.audioOutput - 1,
        }))
    }
    const handleChangeAudioOutputUp = (e) => {
        let status = mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? mediaDevice.mask.true : mediaDevice.mask.false;
        dispatch(handleSetMediaDevice({
            isEnableMask: status,
            videoInput: mediaDeviceConfigState.videoInput,
            audioInput: mediaDeviceConfigState.audioInput,
            audioOutput: mediaDeviceConfigState.audioOutput == 10 ? 10 : mediaDeviceConfigState.audioOutput + 1,
        }))
    }


    return (
        <div className="card-inner">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Media devices')}</span>
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        name="isEnableFont"
                        className="custom-control-input"
                        id="media-device-input"
                        defaultChecked={mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true}
                        onChange={handleChangeInputMediaDeviceMask}
                    />
                    <label className="custom-control-label" htmlFor="media-device-input">
                        {t('Mask media devices')}
                    </label>
                </div>
                {mediaDeviceConfigState.isEnableMask == mediaDevice.mask.true ? (<div className="d-block pt-3">
                    <div className="form-group w-50">
                        <label className="form-label">
                            {t('Media devices')}:
                        </label>
                        <div className="form-control-wrap mb-1">
                            <div className="form-group">
                                <label className="form-label">{t('Video inputs')}</label>
                                <div className="form-control-wrap number-spinner-wrap">
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-minus" data-number="minus" onClick={handleChangeVideoInputDown}>
                                        <em className="icon ni ni-minus"></em>
                                    </button>
                                    <input type="number" className="form-control number-spinner" disabled value={mediaDeviceConfigState.videoInput} min="0" max="10" />
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-plus" data-number="plus" onClick={handleChangeVideoInputUp}>
                                        <em className="icon ni ni-plus"></em>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-control-wrap mb-1">
                            <div className="form-group">
                                <label className="form-label">{t('Audio inputs')}</label>
                                <div className="form-control-wrap number-spinner-wrap">
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-minus" data-number="minus" onClick={handleChangeAudioInputDown}>
                                        <em className="icon ni ni-minus"></em>
                                    </button>
                                    <input type="number" className="form-control number-spinner" disabled value={mediaDeviceConfigState.audioInput} min="0" max="10" />
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-plus" data-number="plus" onClick={handleChangeAudioInputUp}>
                                        <em className="icon ni ni-plus"></em>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-control-wrap mb-1">
                            <div className="form-group">
                                <label className="form-label">{t('Audio outputs')}</label>
                                <div className="form-control-wrap number-spinner-wrap">
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-minus" data-number="minus" onClick={handleChangeAudioOutputDown}>
                                        <em className="icon ni ni-minus"></em>
                                    </button>
                                    <input type="number" className="form-control number-spinner" disabled value={mediaDeviceConfigState.audioOutput} min="0" max="10" />
                                    <button className="btn btn-icon btn-outline-light number-spinner-btn number-plus" data-number="plus" onClick={handleChangeAudioOutputUp}>
                                        <em className="icon ni ni-plus"></em>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>) : ''}


            </div>
        </div>
    );
}

export default MediaDevice;
