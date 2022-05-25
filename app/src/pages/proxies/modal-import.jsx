import React, {memo, useLayoutEffect} from "react";
import {BASE_URL_V1, IMPORT_PROXY} from "../../constants/api";
import axios from "axios";
import MultiToast from "../../components/defaultToast";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import "../../assets/css/form/validate.css";
import * as ValidateResponse from "../../constants/ValidateResponse";
import crypto from "crypto";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

function ModalImportProxy({isShowing, modalName, data, hide, reloadMainTable}) {
    const [t, i18n] = useTranslation();
    let nameModal = 'importProxy';
    /* Validate form */
    const validationSchema = yup.object().shape({
        file_import: yup
            .mixed()
            .required("Please choose a file")
            .test("fileSize","The file is too large", (value) => {
               return value && value[0].size <= 100000000
            })
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema),
    });

    useLayoutEffect(() => {
        reset();
    }, [isShowing]);

    const readImport = async (data) => {
        let file = data.file_import[0];
        let fileReader = new FileReader();
        fileReader.onload  = async (e) => {
            let content = (e.target.result);
            let dataProxy = filterProxy(data.type, content);
            await importProxy(data.type, dataProxy);
        };
        fileReader.readAsText(file);
    };

    const filterProxy = (type, content) => {
        const myArray = content.split("\r\n");
        let arr = [];
        switch (type) {
            case "SSH":
                arr = myArray.map((item) => {
                    const itemArr = item.split("|");
                    let newItemArr = [];
                    if (itemArr.length >= 2) {
                        newItemArr = [itemArr[0],22,itemArr[1],itemArr[2]];
                    }
                    return newItemArr.join("|");
                });
                break;
            case "SOCK5":
            case "SOCK4":
            case "HTTP":
                arr = myArray.map((item) => {
                    const itemArr = item.split("|");
                    let newItemArr = [];
                    if (itemArr.length >= 2) {
                        if (itemArr[0].indexOf(":") >= 0) {
                            let ipPort = itemArr[0].split(":");
                            newItemArr = [ipPort[0],ipPort[1],itemArr[1],itemArr[2]];
                        } else {
                            newItemArr = [itemArr[0],itemArr[1],itemArr[2],itemArr[3]];
                        }
                    }
                    return newItemArr.join("|");
                });
                break;
            default:
                arr = [];
                break;
        }
        return arr;
    }

    const importProxy = async (type, data) => {
        console.log(data)
        axios({
            method: "POST",
            url: BASE_URL_V1 + IMPORT_PROXY,
            data: {
                type: type,
                proxies: data
            }
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
        <div className={(isShowing && modalName.includes(nameModal)) ? "modal fade show d-block" : "modal fade"}
             tabIndex="-1" id="proxyModal">
            <div className="modal-dialog modal-sm" role="document">
                <form className="modal-content modal-content-md"
                      onSubmit={handleSubmit(readImport)}
                >
                    <button className="close btn-close-modal"
                       onClick={(e) => {
                           e.preventDefault();
                           hide(false, nameModal);
                       }}
                    >
                        <em className="icon ni ni-cross"></em>
                    </button>
                    <div className="modal-header">
                        <h5 className="modal-title"> {t('Import Proxy')}</h5>
                    </div>
                    <div className="modal-body overflow-auto">
                        <div className="gy-1">
                            <div className="example-alert">
                                <div className="alert alert-warning alert-icon">
                                    <em className="icon ni ni-alert-circle"></em> {t("File import")} <strong> {t("must be in the correct format")} </strong>. <br/>
                                    {t("You can click")}
                                    <a href="#" className="alert-link"
                                       onClick={event => {
                                           event.preventDefault()
                                       }}
                                    > {t("this")}</a> {t("to see our format")}.
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="type">Type</label>
                                <div className="form-control-wrap ">
                                    <div className="form-control-select">
                                        <select className="form-control" id="type"
                                                {...register("type",
                                                    {
                                                        required: ValidateResponse.REQUIRED_MESSAGE
                                                    })
                                                }
                                        >
                                            <option value="HTTP">HTTP</option>
                                            <option value="SOCK4">Sock 4</option>
                                            <option value="SOCK5">Sock 5</option>
                                            <option value="SSH">SSH (Proxy over SSH)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                    <label className="form-label" htmlFor="file">File</label>
                                    <div className="form-control-wrap ">
                                        <div className="form-file">
                                            <input className="form-control" type="file" id="file" required
                                                   {...register("file_import")}
                                            />
                                            <ErrorMessage errors={errors} name="file_import" as="p"
                                                          className="validateFail"/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">{t("Import")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalImportProxy);