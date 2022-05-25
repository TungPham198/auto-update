import React, { useState, memo, useLayoutEffect } from "react";
import { ADD_FOLDER, BASE_URL_V1 } from "../../constants/api";
import axios from "axios";
import MultiToast from "../../components/defaultToast";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "../../assets/css/form/validate.css";
import * as ValidateResponse from "../../constants/ValidateResponse";

function ModalAddFolder({ isShowing, modalName, data, hide, reloadMainTable }) {

    let nameModal = 'addFolder';


    /* Validate form */
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useLayoutEffect(() => {
        reset();
    }, [isShowing]);

    const handleonSubmit = (e) => {
        let method = 'post';
        let url = BASE_URL_V1 + ADD_FOLDER;
        let dataForm = {
            name: e.addfolder
        }

        if (data) {
            method = 'put';
            url = BASE_URL_V1 + ADD_FOLDER + '/' + data.uuid;
        }

        axios({
            method: method,
            url: url,
            data: dataForm
        }).then(res => {
            hide(false, nameModal);
            reloadMainTable();
            MultiToast.defaultToast(res);
        }).catch(error => {
            MultiToast.defaultToast(error);
        }
        );
    }

    return (
        <div className={((isShowing && modalName.includes(nameModal))) ? "modal fade show d-block" : "modal fade"}
            tabIndex="-1" id="proxyModal">
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                    <button className="close btn-close-modal" onClick={() => hide(false, nameModal)} >
                        <em className="icon ni ni-cross"></em>
                    </button>
                    <div className="modal-header">
                        <h5 className="modal-title">{data && data.uuid ? "Edit" : "Add"} Folder</h5>
                    </div>
                    <div className="modal-body">
                        <form className="form-group group-add-center justify-content-around gap-05 align-items-start" onSubmit={handleSubmit(handleonSubmit)} >
                            <label className="form-label " htmlFor="add_folder">Folder name:</label>
                            <div className="form-group flex-grow-1 mb-0">
                                <div className="form-group">
                                    <input type="text" className="form-control input-email" id="add_folder"
                                        placeholder="Sample folder"
                                        {
                                        ...register("addfolder", {
                                            value: data ? data.name : "",
                                            required: ValidateResponse.REQUIRED_MESSAGE
                                        })
                                        }
                                    />
                                    <ErrorMessage errors={errors} name="addfolder" as="p" className="validateFail" />
                                </div>
                            </div>
                            <input type="submit" className="btn btn-outline-primary btn-status" value={data && data.uuid ? "Edit" : "Add"} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalAddFolder);