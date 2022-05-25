import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handleSetExtension } from "../../../redux/components/browser/browserSilce";

function Extension(props) {
    const [t, i18n] = useTranslation();

    const dispatch = useDispatch();
    const extensionState = useSelector((state) => state.browserConfig.extension);

    const hangdleChangInputFile = (e) => {
        let path = e.target.files[0].path.replace(e.target.files[0].name, '');
        dispatch(handleSetExtension({
            key: 'path',
            value: path
        }));
    }
    const handleChangCheckBoxIsCustom = (e) => {
        dispatch(handleSetExtension({
            key: 'isCustom',
            value: e.target.checked
        }));
    };
    const handleDeleteExtension = (e) => {
        dispatch(handleSetExtension({
            key: 'deletePath',
            value: e.target.getAttribute("data-folder")
        }));
    };

    return (
        <div className="card-inner">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Extension')}</span>
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="extension-input"
                        defaultChecked={extensionState.isCustom}
                        onChange={handleChangCheckBoxIsCustom}
                    />
                    <label className="custom-control-label" htmlFor="extension-input">
                        {t('Pre-load custom extentions.')}
                    </label>
                </div>
                {extensionState.isCustom ? (
                    <div className="d-block pt-3">
                        <div className="row gy-4 align-center">
                            <div className="col-12">
                                <div className="group-sub-text mb-2 prompt">
                                    <span className="sub-text-icon">
                                        <i className="fas fa-check"></i>
                                    </span>
                                    <p className="sub-text">
                                        {t('Extension text')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <div className="form-group">
                                <label className="form-label" htmlFor="default-06">{t('Choose your extension')}</label>
                                <div className="form-control-wrap">
                                    <div className="form-file">
                                        <input type="file" className="form-file-input" id="extensionFile" directory="" webkitdirectory="" onChange={hangdleChangInputFile} />
                                        <label className="form-file-label" htmlFor="extensionFile"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {extensionState.path.map((item, index) => (
                            <div className="form-group mb-0 " key={index}>
                                <label className="form-label me-2 text-success">{item}</label>

                                <em className="fas fa-trash-alt text-danger btn" data-folder={item} onClick={handleDeleteExtension}></em>
                            </div>
                        ))}


                    </div>
                ) : ''}

            </div>
        </div>
    );
}

export default Extension;
