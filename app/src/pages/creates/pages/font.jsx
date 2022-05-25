import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleSetFont } from "../../../redux/components/browser/browserSilce";

function Font(props) {
    const [t, i18n] = useTranslation();
    const fontConfigState = useSelector((state) => state.browserConfig.font);
    const dispatch = useDispatch();
    const hanldeChangeCheckbox = (e)=>{
        dispatch(handleSetFont({
            isEnable:e.target.checked,
            value:fontConfigState.value
        }));
    }
    return (
        <div className="card-inner">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Font')}</span>
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        name="isEnableFont"
                        className="custom-control-input"
                        id="font-status-input"
                        defaultChecked={fontConfigState.isEnable}
                        onChange={hanldeChangeCheckbox}
                    />
                    <label className="custom-control-label" htmlFor="font-status-input">
                        {t('Enable font list masking')}
                    </label>
                </div>
                {!fontConfigState.isEnable ? (<div className="d-block pt-3">
                    <div className="form-group w-50">
                        <label className="form-label" htmlFor="timezone-screen">
                            {t('Browser profile fonts list')}:
                        </label>
                        <div className="form-control-wrap ">
                            <div className="font-list-scroll">
                                <ul>
                                    {fontConfigState.value.map((item,index) =>
                                        <li key={index}>{item}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>) : ''}

            </div>
        </div>
    );
}

export default Font;
