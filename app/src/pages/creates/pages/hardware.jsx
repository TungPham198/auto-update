import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hardware } from "../../../constants/create";
import FingerPrintService from "../../../service/fingerprint.service";
import MultiToast from "../../../components/defaultToast";
import Convert from "../../../components/convert_object";
import {
    handleSetAudioContext,
    handleSetCanvas,
    handleSetWebGLImage,
    handleSetWebGLMetatdata,
    handleSetWebGLVendor,
    handleSetWebGLMetadataRenderer
} from "../../../redux/components/browser/browserSilce";
import { useTranslation } from "react-i18next";

function Hardware(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const browserConfigState = useSelector((state) => state.browserConfig);

    const handleChangCanvasInput = (e) => {
        dispatch(handleSetCanvas(e.target.value))
    }
    const handleChangAudioContextInput = (e) => {
        dispatch(handleSetAudioContext(e.target.value))
    }
    const handleChangwebGLImageInput = (e) => {
        dispatch(handleSetWebGLImage(e.target.value))
    }
    const handleChangwebGLMetadataVendorInput = (e) => {
        dispatch(handleSetWebGLMetatdata(e.target.value))
    }

    const handleReloadWebGL = async (e) => {
        let params = {
            'platform': Convert.flatformToOSFull[browserConfigState.platform],
        }
        const handleType = e.currentTarget.getAttribute("data-type");
        if (handleType == 'webgl-renderer') {
            params.webgl = browserConfigState.webGLVendor;
        }
        await FingerPrintService.getWebGL(params)
            .then((response) => {
                dispatch(handleSetWebGLVendor(response.data.content.vendor))
                dispatch(handleSetWebGLMetadataRenderer(response.data.content.render))
            })
            .catch(error => {
                MultiToast.defaultToast(error)
            })
    }
    return (
        <div className="card-inner" id="canvas">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Canvas')}</span>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-canvar"
                            className="custom-control-input"
                            id="hardware-prompt"
                            defaultChecked={browserConfigState.canvas == hardware.canvas.noise}
                            value={hardware.canvas.noise}
                            onChange={handleChangCanvasInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-prompt">
                            {t('Noise')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-canvar"
                            className="custom-control-input"
                            id="hardware-allow"
                            defaultChecked={browserConfigState.canvas == hardware.canvas.off}
                            value={hardware.canvas.off}
                            onChange={handleChangCanvasInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-allow">
                            {t('Off')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-canvar"
                            className="custom-control-input"
                            id="hardware-block"
                            defaultChecked={browserConfigState.canvas == hardware.canvas.block}
                            value={hardware.canvas.block}
                            onChange={handleChangCanvasInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-block">
                            {t('Block')}
                        </label>
                    </div>
                </div>

                {/* sub-text */}

                {browserConfigState.canvas == hardware.canvas.noise ? (<div className="group-sub-text mb-2 prompt">
                    <span className="sub-text-icon">
                        <i className="fas fa-check"></i>
                    </span>
                    <p className="sub-text">
                        {t('Hardware canvas noise')}
                    </p>
                </div>) : ''}


                {browserConfigState.canvas == hardware.canvas.off ? (<div className="group-sub-text mb-2 allow">
                    <span className="sub-text-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware canvas off")}
                    </p>
                </div>) : ''}


                {browserConfigState.canvas == hardware.canvas.block ? (<div className="group-sub-text mb-2 allow">
                    <span className="sub-text-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware canvas block")}
                    </p>
                </div>) : ''}
            </div>

            {/* AudioContext */}
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Audio Context')}</span>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="audio-context"
                            className="custom-control-input"
                            id="hardware-prompt-audio-context"
                            defaultChecked={browserConfigState.audioContext == hardware.audioContext.noise}
                            value={hardware.audioContext.noise}
                            onChange={handleChangAudioContextInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-prompt-audio-context">
                            {t('Noise')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="audio-context"
                            className="custom-control-input"
                            id="hardware-allow-audio-context"
                            defaultChecked={browserConfigState.audioContext == hardware.audioContext.off}
                            value={hardware.audioContext.off}
                            onChange={handleChangAudioContextInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-allow-audio-context">
                            {t('Off')}
                        </label>
                    </div>

                </div>

                {/* sub-text */}

                {browserConfigState.audioContext == hardware.audioContext.noise ? (<div className="group-sub-text mb-2 prompt">
                    <span className="sub-text-icon">
                        <i className="fas fa-check"></i>
                    </span>
                    <p className="sub-text">
                        {t('Hardware audioContext noise')}
                    </p>
                </div>) : ''}


                {browserConfigState.audioContext == hardware.audioContext.off ? (<div className="group-sub-text mb-2 allow">
                    <span className="sub-text-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware audioContext off")}
                    </p>
                </div>) : ''}
            </div>
            {/* AudioContext */}
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('WebGL image')}</span>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-webgl-image"
                            className="custom-control-input"
                            id="hardware-prompt-webGL-image"
                            defaultChecked={browserConfigState.webGLImage == hardware.webGLImage.noise}
                            value={hardware.webGLImage.noise}
                            onChange={handleChangwebGLImageInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-prompt-webGL-image">
                            {t('Noise')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-webgl-image"
                            className="custom-control-input"
                            id="hardware-allow-webGL-image"
                            defaultChecked={browserConfigState.webGLImage == hardware.webGLImage.off}
                            value={hardware.webGLImage.off}
                            onChange={handleChangwebGLImageInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-allow-webGL-image">
                            {t('Off')}
                        </label>
                    </div>

                </div>

                {/* sub-text */}

                {browserConfigState.webGLImage == hardware.webGLImage.noise ? (<div className="group-sub-text mb-2 prompt">
                    <span className="sub-text-icon">
                        <i className="fas fa-check"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware webGLImage noise")}                     </p>
                </div>) : ''}


                {browserConfigState.webGLImage == hardware.webGLImage.off ? (<div className="group-sub-text mb-2 allow">
                    <span className="sub-text-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware webGLImage off")}                    </p>
                </div>) : ''}
            </div>
            {/* webgl metadata */}
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('WebGL metadata')}</span>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-webgl-metadata-vendor"
                            className="custom-control-input"

                            id="hardware-prompt-webGL-metadata-vender"
                            defaultChecked={browserConfigState.webGLMetadataVendor == hardware.webGLMetadataVendor.noise}
                            value={hardware.webGLMetadataVendor.noise}
                            onChange={handleChangwebGLMetadataVendorInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-prompt-webGL-metadata-vender">
                            {t('Noise')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="hardware-webgl-metadata-vendor"
                            className="custom-control-input"
                            id="hardware-allow-webGL-metadata-vender"
                            defaultChecked={browserConfigState.webGLMetadataVendor == hardware.webGLMetadataVendor.off}
                            value={hardware.webGLMetadataVendor.off}
                            onChange={handleChangwebGLMetadataVendorInput}
                        />
                        <label className="input-type btn" htmlFor="hardware-allow-webGL-metadata-vender">
                            {t('Off')}
                        </label>
                    </div>

                </div>

                {/* sub-text */}

                {browserConfigState.webGLMetadataVendor == hardware.webGLMetadataVendor.noise ? (<div className="group-sub-text mb-2 prompt">
                    <span className="sub-text-icon">
                        <i className="fas fa-check"></i>
                    </span>
                    <p className="sub-text">
                        {t('Hardware webGLMetadataVendor noise')}                    </p>
                </div>) : ''}

                {browserConfigState.webGLMetadataVendor == hardware.webGLMetadataVendor.off ? (<div className="group-sub-text mb-2 allow">
                    <span className="sub-text-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                    <p className="sub-text">
                        {t("Hardware webGLMetadataVendor off")}                    </p>
                </div>) : ''}

                {browserConfigState.webGLMetadataVendor == hardware.webGLMetadataVendor.noise ? (<><div className="form-group">
                    <label className="form-label" htmlFor="webGL-vendor">
                        {t('WebGL vendor')}
                    </label>
                    <div className="form-control-wrap row w-50">
                        <div className="form-control-wrap col-10">
                            <input
                                type="text"
                                className="form-control"
                                id="webGL-vendor"
                                placeholder="WebGL vendor"
                                value={browserConfigState.webGLVendor}
                                disabled
                            />
                        </div>

                        <div className="form-control-wrap col-2 d-flex proxy-group-gap">
                            <button
                                className="btn-modal btn btn-dim btn-outline-secondary"
                                id="btn-reload-webgl-vendor"
                                data-type="webgl-vendor"
                                onClick={handleReloadWebGL}
                            >
                                <i className="fas fa-history"></i>
                            </button>
                        </div>
                    </div>
                </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="webGL-renderer">
                            {t('WebGL renderer')}
                        </label>
                        <div className="form-control-wrap row w-50">
                            <div className="form-control-wrap col-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="webGL-renderer"
                                    placeholder="WebGL rederer"
                                    value={browserConfigState.webGLMetadataRenderer}
                                    disabled
                                />
                            </div>

                            <div className="form-control-wrap col-2 d-flex proxy-group-gap">
                                <button
                                    className="btn-modal btn btn-dim btn-outline-secondary"
                                    id="btn-reload-webgl-renderer"
                                    data-type="webgl-renderer"
                                    onClick={handleReloadWebGL}
                                >
                                    <i className="fas fa-history"></i>
                                </button>
                            </div>
                        </div>
                    </div></>) : ''}

            </div>
        </div >
    );
}

export default Hardware;
