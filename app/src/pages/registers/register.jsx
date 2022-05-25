import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { userService } from "../../services/user.service";
import {
    LoginAction,
    RegisterAction,
} from "../../redux/components/user/userSlice";
import ROUTES from "Constants/routes";
import { useForm } from "react-hook-form";
import authService from "../../service/auth.service";
import * as ValidateResponse from "../../constants/ValidateResponse";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import "../../assets/css/form/validate.css";
import { Redirect } from "react-router-dom";
import loadIpConfig from "../../components/preloadIpConfig";
import ipinforService from "../../service/ipinfor.service";
import { useTranslation } from "react-i18next";
import MultiToast from "../../components/defaultToast";

export default function Register(props) {
    const [t, i18n] = useTranslation();
    const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
    const dispatch = useDispatch();
    const ConfigState = useSelector((state) => state);
    const ipInfoConfigState = ConfigState.ipInfoConfig;
    const deviceInfoConfigState = ConfigState.deviceInfoConfig;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    
    const submitregister = async (data) => {
        setDisabledBtnSubmit(true);
        
        const loc = ipInfoConfigState.loc.split(',');

        let infor = {
            ip: ipInfoConfigState.ip,
            location: {
                lat: loc[0],
                lon: loc[1],
            },
            country: ipInfoConfigState.country,
            timezone: ipInfoConfigState.timezone,
            region: ipInfoConfigState.region,
            device: deviceInfoConfigState,
        };

        await authService
            .register({ infor, ...data })
            .then((response) => {
                setDisabledBtnSubmit(false);
                    props.history.push("/verify");
                    MultiToast.defaultToast(response);
            })
            .catch((error) => {
                setDisabledBtnSubmit(false);
                MultiToast.defaultToast(error);
            });
    };

    return (
        <>
            <div className="nk-app-root">
                <div className="nk-main ">
                    <div className="nk-wrap nk-wrap-nosidebar">
                        <div className="nk-content ">
                            <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                <div className="brand-logo pb-4 text-center">
                                    <a href="#" className="logo-link">
                                        <h3>{t('Multibrowser')}</h3>
                                    </a>
                                </div>
                                <div className="card card-bordered">
                                    <div className="card-inner card-inner-lg">
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h4 className="nk-block-title">{t('Register')}</h4>
                                                <div className="nk-block-des"></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-00">
                                                    {t('Name')} <span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="default-00"
                                                    placeholder="Enter your name"
                                                    {...register("name", {
                                                        required: ValidateResponse.REQUIRED_MESSAGE,
                                                        pattern: {
                                                            minLength: 3,
                                                            message:
                                                                ValidateResponse.MIN_LENGTH_REGISTER_NAME_MESSAGE,
                                                        },
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="name"
                                                    as="p"
                                                    className="validateFail"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    {t('Email')} <span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="default-01"
                                                    placeholder="Enter your email address"
                                                    {...register("email", {
                                                        required: ValidateResponse.REQUIRED_MESSAGE,
                                                        pattern: {
                                                            value: ValidateResponse.MAIL_ACCEPT_VALUE,
                                                            message: ValidateResponse.MAIL_ACCEPT_MESSAGE,
                                                        },
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="email"
                                                    as="p"
                                                    className="validateFail"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="password">
                                                    {t('Password')} <span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                {/* <a
                          href="#"
                          className="form-icon form-icon-right passcode-switch lg"
                          data-target="password"></a> */}
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    {...register("password", {
                                                        required: ValidateResponse.REQUIRED_MESSAGE,
                                                        minLength: {
                                                            value: 6,
                                                            message: ValidateResponse.PASSWORD_MIN_MESSAGE,
                                                        },
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="password"
                                                    as="p"
                                                    className="validateFail"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="password">
                                                    {t('Confirm Password')} <span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                {/* <a
                          href="#"
                          className="form-icon form-icon-right passcode-switch lg"
                          data-target="password"></a> */}
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    {...register("password_confirmation", {
                                                        required: ValidateResponse.REQUIRED_MESSAGE,
                                                        minLength: {
                                                            value: 6,
                                                            message: ValidateResponse.PASSWORD_MIN_MESSAGE,
                                                        },
                                                        validate: (value) =>
                                                            value === password.current ||
                                                            ValidateResponse.PASSWORD_CONFIRM_MESSAGE,
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="password_confirmation"
                                                    as="p"
                                                    className="validateFail"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                disabled={disabledBtnSubmit}
                                                id="btnLogin"
                                                onClick={handleSubmit(submitregister)}
                                                className="btn btn-lg btn-primary btn-block">
                                                {t('Register')}
                                            </button>
                                        </div>
                                        <div className="form-note-s2 text-center pt-4">
                                            {t('Already have an account ?')}
                                            <Link to={ROUTES.SIGNIN}> {t('Login')}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
