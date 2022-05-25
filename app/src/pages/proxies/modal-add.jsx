import React, {memo, useLayoutEffect} from "react";
import {BASE_URL_V1, PROXY} from "../../constants/api";
import axios from "axios";
import MultiToast from "../../components/defaultToast";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import "../../assets/css/form/validate.css";
import * as ValidateResponse from "../../constants/ValidateResponse";
import crypto from "crypto";
import {useTranslation} from "react-i18next";

function ModalAddProxy({isShowing, modalName, data, hide, reloadMainTable}) {
    const [t, i18n] = useTranslation();
    let nameModal = 'addProxy';
    /* Validate form */
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    useLayoutEffect(() => {
        reset();
    }, [isShowing]);

    const addProxy = async (data) => {
        let addProxyJson = {
            "note": "",
            "details": {
                "ip": "45.58.61.166",
                "hostname": "kmdczy.ml",
                "city": "Dallas",
                "region": "Texas",
                "country": "US",
                "loc": "32.8152,-96.8703",
                "org": "AS201106 Spartan Host Ltd",
                "postal": "75247",
                "timezone": "America/Chicago",
                "asn": {
                    "asn": "AS201106",
                    "name": "Spartan Host Ltd",
                    "domain": "spartanhost.org",
                    "route": "45.58.61.0/24",
                    "type": "hosting"
                }
            }
        };
        const saveData = Object.assign(addProxyJson, data);
        saveData["title"] = crypto.randomBytes(20).toString('hex');
        let method = "POST", url = BASE_URL_V1 + PROXY;
        if (saveData.id.length > 0) {
            method = "PUT";
            url = url + "/" + saveData.id;
        }
        axios({
            method: method,
            url: url,
            data: saveData
        }).then(res => {
            hide(false, nameModal);
            reloadMainTable();
            MultiToast.defaultToast(res);
        }).catch(error => {
                MultiToast.defaultToast(error);
            }
        );
    };

    const checkProxy = async (data) => {
        console.log(data)
    }

    return (
        <div className={(isShowing && modalName.includes(nameModal)) ? "modal fade show d-block" : "modal fade"}
             tabIndex="-1" id="proxyModal">
            <div className="modal-dialog modal-sm" role="document">
                <form className="modal-content modal-content-lg"
                      onSubmit={handleSubmit(addProxy)}
                >
                    <input type="hidden"
                           {...register("id",
                               {
                                   value: data.uuid ? data.uuid : "",
                               }
                           )}
                    />
                    <button className="close btn-close-modal"
                            onClick={() => hide(false, nameModal)}
                    >
                        <em className="icon ni ni-cross"></em>
                    </button>
                    <div className="modal-header">
                        <h5 className="modal-title">{data.uuid?"Edit":"Add"} {t("proxy")}</h5>
                    </div>
                    <div className="modal-body overflow-auto">
                        <div className="row gy-4">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="proxyType">{t("Proxy type")}</label>
                                    <div className="form-control-wrap ">
                                        <div className="form-control-select">
                                            <select className="form-control" id="proxyType"
                                                    {...register("type",
                                                        {
                                                            value: data.type ? data.type : "HTTP",
                                                            required: ValidateResponse.REQUIRED_MESSAGE
                                                        })
                                                    }
                                            >
                                                <option value="HTTP">{t("HTTP")}</option>
                                                <option value="SOCK4">{t("SOCK4")}</option>
                                                <option value="SOCK5">{t("SOCK5")}</option>
                                                <option value="SSH">{t("SSH (Proxy over SSH)")}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row gy-2 pe-0">
                                <div className="col-9 pe-0">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="ipAddress">{t("IP address")}</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="ipAddress"
                                                   placeholder="Ex: 192.168.1.1"
                                                   {...register("ip",
                                                       {
                                                           value: data.ip ? data.ip : "",
                                                           required: ValidateResponse.REQUIRED_MESSAGE,
                                                           maxLength: {
                                                               value: 255,
                                                               message: ValidateResponse.MAXLENGTH_MESSAGE
                                                           },
                                                       })
                                                   }
                                            />
                                            <ErrorMessage errors={errors} name="ip" as="p"
                                                          className="validateFail"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 pe-0">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="Port">{t("Port")}</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="Port"
                                                   placeholder="Ex: 8080"
                                                   {...register("port",
                                                       {
                                                           value: data.port ? data.port : "",
                                                           pattern: {
                                                               value: ValidateResponse.PORT_ACCEPT_VALUE,
                                                               message: ValidateResponse.PORT_ACCEPT_MESSAGE,
                                                           },
                                                       })
                                                   }
                                            />
                                            <ErrorMessage errors={errors} name="port" as="p"
                                                          className="validateFail"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="username">{t("Username")}</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="username"
                                               placeholder="Enter username"
                                               {...register("user",
                                                   {
                                                       value: data.user ? data.user : "",
                                                       maxLength: {
                                                           value: 255,
                                                           message: ValidateResponse.MAXLENGTH_MESSAGE
                                                       },
                                                   })
                                               }
                                        />
                                        <ErrorMessage errors={errors} name="user" as="p"
                                                      className="validateFail"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">{t("Password")}</label>
                                    <div className="form-control-wrap">
                                        <input type="text" className="form-control" id="password"
                                               placeholder="Enter password"
                                               {...register("pass",
                                                   {
                                                       value: data.pass ? data.pass : "",
                                                       maxLength: {
                                                           value: 255,
                                                           message: ValidateResponse.MAXLENGTH_MESSAGE
                                                       },
                                                   })
                                               }
                                        />
                                        <ErrorMessage errors={errors} name="pass" as="p"
                                                      className="validateFail"/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="proxyHost">{t("Check proxy host")}</label>
                                    <div className="form-control-wrap ">
                                        <div className="form-control-select">
                                            <select className="form-control" id="proxyHost">
                                                <option value="default_option">Browserleaks.com</option>
                                                <option value="default_option">Ipinfo.io</option>
                                                <option value="default_option">Ipgeolocation.io</option>
                                                <option value="default_option">api.ip.sb</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <a href="#" className="btn btn-info"
                                   onClick={e => {
                                       e.preventDefault()
                                       checkProxy()
                                   }}
                                >{t("Check proxy")}</a>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">{data.uuid?"Edit":"Add"} {t("proxy")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(ModalAddProxy);