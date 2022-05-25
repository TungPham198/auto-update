import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    handleSetGeolocation,
    browserConfig,
} from "./../../../redux/components/browser/browserSilce";
import { geolocation } from "./../../../constants/create";
import { useTranslation } from "react-i18next";

function formatGeolocation(geolocation, key, value) {
    key.map((itemKey, index) => {
        geolocation[itemKey] = value[index];
    });
    return geolocation;
}

function Geolocation(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();

    const geolocationState = useSelector(
        (state) => state.browserConfig.geolocation
    );

    let geolocationBehavior = geolocationState.behavior;
    let geolocationBehaviorLat = geolocationState.lat;
    let geolocationBehaviorLong = geolocationState.long;
    let geolocationBase = geolocationState.base;
    let geolocatioAccuracy = geolocationState.accuracy;

    const handelGeolocationSetBihavior = (e) => {
        dispatch(
            handleSetGeolocation(
                formatGeolocation(
                    { ...geolocationState },
                    ["behavior"],
                    [e.target.value]
                )
                // convertData(e.target.value, location, geolocationBase)
            )
        );
    };

    const handelSetIsGeolocationBase = (e) => {
        dispatch(
            handleSetGeolocation(
                formatGeolocation(
                    { ...geolocationState },
                    ["base"],
                    [e.target.checked ? geolocation.base.true : geolocation.base.false]
                )
            )
        );
    };
    const handleSetGeolocationLat = (e) => {
        // let location = {
        //   lat: e.target.value,
        //   long: geolocationBehaviorLong,
        // };
        dispatch(
            handleSetGeolocation(
                formatGeolocation({ ...geolocationState }, ["lat"], [e.target.value])
            )
        );
    };
    const handleSetGeolocationLong = (e) => {
        dispatch(
            handleSetGeolocation(
                formatGeolocation({ ...geolocationState }, ["long"], [e.target.value])
            )
        );
    };

    const handleSetGeolocationAccuracy = (e) => {
        dispatch(
            handleSetGeolocation(
                formatGeolocation({ ...geolocationState }, ["accuracy"], [e.target.value])
            )
        );
    };

    return (
        <div className="card-inner" id="geolocation">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Geolocation')}</span>
                <div className="btn-group d-block pb-2 behavior">
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="geolocationType"
                            className="custom-control-input"
                            id="geolocation-prompt"
                            value={geolocation.behavior.prompt}
                            defaultChecked={
                                geolocationBehavior == geolocation.behavior.prompt
                            }
                            onChange={handelGeolocationSetBihavior}
                        />
                        <label className="input-type btn" htmlFor="geolocation-prompt">
                            {t('Prompt')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="geolocationType"
                            className="custom-control-input"
                            id="geolocation-allow"
                            value={geolocation.behavior.allow}
                            defaultChecked={geolocationBehavior == geolocation.behavior.allow}
                            onChange={handelGeolocationSetBihavior}
                        />
                        <label className="input-type btn" htmlFor="geolocation-allow">
                            {t('Allow')}
                        </label>
                    </div>
                    <div className="custom-control custom-radio webrtc-group-input-type">
                        <input
                            type="radio"
                            name="geolocationType"
                            className="custom-control-input"
                            id="geolocation-block"
                            value={geolocation.behavior.block}
                            defaultChecked={geolocationBehavior == geolocation.behavior.block}
                            onChange={handelGeolocationSetBihavior}
                        />
                        <label className="input-type btn" htmlFor="geolocation-block">
                            {t('Block')}
                        </label>
                    </div>
                </div>

                {geolocationBehavior == geolocation.behavior.prompt ? (
                    <div className="group-sub-text mb-2 prompt">
                        <span className="sub-text-icon">
                            <i className="fas fa-check"></i>
                        </span>
                        <p className="sub-text">
                            {t('Geolocation text prompt')}
                        </p>
                    </div>
                ) : (
                    ""
                )}
                {geolocationBehavior == geolocation.behavior.allow ? (
                    <div className="group-sub-text mb-2 allow">
                        <span className="sub-text-icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        <p className="sub-text">
                            {t('Geolocation text allow')}
                        </p>
                    </div>
                ) : (
                    ""
                )}
                {geolocationBehavior == geolocation.behavior.block ? (
                    <div className="group-sub-text mb-2 allow">
                        <span className="sub-text-icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        <p className="sub-text">
                            {t('Geolocation text block')}
                        </p>
                    </div>
                ) : (
                    ""
                )}

                {geolocationBehavior == geolocation.behavior.prompt ||
                    geolocationBehavior == geolocation.behavior.allow ? (
                    <div className="custom-control custom-switch">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="geolocation-input-base"
                            // value={geolocation.base.true}
                            checked={geolocationState.base == geolocation.base.true}
                            onChange={handelSetIsGeolocationBase}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor="geolocation-input-base">
                            {t('Fill WebRTC Public IP based on the IP.')}
                        </label>
                    </div>
                ) : (
                    ""
                )}

                {(geolocationBehavior == geolocation.behavior.prompt ||
                    geolocationBehavior == geolocation.behavior.allow) &&
                    geolocationBase == geolocation.base.false ? (
                    <div className="d-block pt-3">
                        <div className="row gy-4 align-center">
                            <div className="col-12">
                                <p className="nk-block-des">
                                    {t('Fill geolocation coordinates on browser profile start based on the external IP.')}
                                </p>
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <label className="form-label" htmlFor="geolocation_latitude">
                                {t('Latitude')}:
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="geolocation_latitude"
                                    placeholder="Latitude"
                                    defaultValue={geolocationBehaviorLat}
                                    onChange={handleSetGeolocationLat}
                                />
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <label className="form-label" htmlFor="geolocation_longtitude">
                                {t('Longtitude')}:
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="geolocation_longtitude"
                                    placeholder="Longtitude"
                                    defaultValue={geolocationBehaviorLong}
                                    onChange={handleSetGeolocationLong}
                                />
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <label className="form-label">{t('Accuracy')}: <span className="text-success">{geolocatioAccuracy} {t('meters')}</span></label>
                            <div className="form-control-wrap">
                                <div className="form-control-slider noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr" data-start="30" id="Default-Range">
                                    <div className="noUi-base">
                                        <input onChange={handleSetGeolocationAccuracy} type="range" className="form-range" min="0" max="100" value={geolocatioAccuracy} step="10" id="customRange3"/>
                                    </div>
                                </div>
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

export default Geolocation;
