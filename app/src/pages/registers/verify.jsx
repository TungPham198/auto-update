import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { userService } from "../../services/user.service";
import {
    LoginAction,
    RegisterAction,
    VerifyAction,
} from "../../redux/components/user/userSlice";
import ROUTES from "Constants/routes";
import { useForm } from "react-hook-form";
import authService from "../../service/auth.service";
import * as ValidateResponse from "../../constants/ValidateResponse";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import "../../assets/css/form/validate.css";
import Multitoast from "../../components/defaultToast";
import { useTranslation } from "react-i18next";

export default function Verify(props) {
    const [t, i18n] = useTranslation();
    const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
    let timeCountdown = 120;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [countdown, setCountdown] = useState(timeCountdown);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const submitVerify = async (data) => {
        // setDisabledBtnSubmit(true);
        await authService
            .verify({ uuid: user.uuid, action: user.action, ...data })
            .then((response) => {
                // setDisabledBtnSubmit(false);
                if (response.data.type === "success") {
                    toast.success(response.data.title);
                    dispatch(
                        LoginAction({ isAuthUser: true, ...response.data.content })
                    );
                    props.history.push(ROUTES.WELCOME);
                } else {
                    toast.error(response.data.title);
                }
            })
            .catch((error) => {
                // setDisabledBtnSubmit(false);
                toast.error(error.response.data.title);
            })
            ;
    };

    useEffect(() => {
        let interval = setInterval(() => {
            setCountdown(oldCountdown => oldCountdown > 0 ? oldCountdown - 1 : oldCountdown)
        }, 1000);
        return () => clearInterval(interval)
    }, []);

    const handleResendOTP = async (e) => {
        e.preventDefault();
        await authService
            .resendOTP({ uuid: user.uuid, action: 'register' })
            .then((response) => {
                Multitoast.defaultToast(response);
                return response;
            })
            .catch((error) => {
                Multitoast.defaultToast(error);
            })
            .finally(e => {
                setCountdown(timeCountdown);
            });
    }

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
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-00">
                                                    {t('Code')} <span className="text-danger">*</span>
                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="default-00"
                                                    placeholder="Enter your otp"
                                                    {...register("otp", {
                                                        required: ValidateResponse.REQUIRED_MESSAGE,
                                                        validate: (value) =>
                                                            Number.isInteger(parseInt(value)) ||
                                                            ValidateResponse.IS_NUMBER_MESSAGE,
                                                        maxLength: {
                                                            value: 6,
                                                            message:
                                                                ValidateResponse.MIN_LENGTH_VERIFY_MESSAGE,
                                                        },
                                                        minLength: {
                                                            value: 6,
                                                            message:
                                                                ValidateResponse.MIN_LENGTH_VERIFY_MESSAGE,
                                                        },
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="otp"
                                                    as="p"
                                                    className="validateFail"
                                                />
                                            </div>
                                        </div>

                                        {countdown == 0 ? (
                                            <div className="form-group d-flex justify-content-center gap-1">
                                                {t('Dont receive OTP?')}
                                                <Link to={ROUTES.RESENDOTP} className="text-success fw-bold" onClick={handleResendOTP}>{t('RESEND OTP')}</Link>
                                            </div>
                                        ) : (
                                            <div className="form-group d-flex justify-content-center gap-1">
                                                {t('Resend OTP in')} <span className="text-danger fw-bold">{Math.floor(countdown / 60)}:{countdown % 60 == 0 ? '00' : countdown % 60}s</span>
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <button
                                                disabled={disabledBtnSubmit}
                                                id="btnLogin"
                                                onClick={handleSubmit(submitVerify)}
                                                className="btn btn-lg btn-primary btn-block">
                                                {t('Verify')}
                                            </button>
                                        </div>
                                        <div className="form-note-s2 text-center pt-4">
                                            {t(' Do you already have an account ?')}
                                            <Link to={ROUTES.SIGNIN}>{t('Login')}</Link>
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
