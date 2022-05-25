import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ChangeAction, LoginAction } from "../../redux/components/user/userSlice";
import AuthService from "../../service/auth.service";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import "../../assets/css/form/validate.css";
import * as ValidateResponse from "../../constants/ValidateResponse"
import { Link } from "react-router-dom";
import ROUTES from "Constants/routes";
import Multitoast from "../../components/defaultToast";
import { useTranslation } from "react-i18next";

const SigninPage = (props) => {
    const [t, i18n] = useTranslation();
    const [disabledBtnSubmit, setDisabledBtnSubmit] = useState(false);
    const dispatch = useDispatch();
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    /* Validate form */
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    /* Handle submit form */
    const onhandleSubmit = async (data) => {
        setDisabledBtnSubmit(true);

        /* example infor */
        const infor = {
            "ip": "222.252.3.2",
            "location": {
                "lat": 21.0313,
                "lon": 105.8516
            },
            "timezone": "Asia/Bangkok",
            "country": "Vietnam",
            "region": "HN",
            "device": {
                "operating_system_name": "Microsoft Windows 10 Pro",
                "operating_system_architecture": "64-bit",
                "displaying_processor_name": "Intel(R) Core(TM) i5-9400F CPU @ 2.90GHz",
                "user_name_of_pc": "MINHHOANGJSC",
                "machine_name": "DESKTOP-M4M8M5R",
                "os_type": "64-Bit, 6 Processor",
                "ram": "16gb"
            }
        }

        await AuthService.login({ infor, ...data })
            .then((response) => {
                setDisabledBtnSubmit(false);
                if (response.data.type === 'success' && response.data.content.need_confirmation) {
                    dispatch(ChangeAction(
                        {
                            action: response.data.content.action,
                            uuid: response.data.content.uuid,
                        }
                    ));
                    props.history.push(ROUTES.VERIFY);
                } else {
                    props.LoginAction({ isAuthUser: true, ...response.data.content })
                    props.history.push(ROUTES.WELCOME);
                }
                Multitoast.defaultToast(response);
            })
            .catch(error => {
                setDisabledBtnSubmit(false);
                Multitoast.defaultToast(error);
            })
    };

    return (
        <React.Fragment>
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
                                <form onSubmit={handleSubmit(onhandleSubmit)}>
                                    <div className="card card-bordered">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title">{t('Sign-In')}</h4>
                                                    <div className="nk-block-des">
                                                        <p>{t('Access Multi-Browser with your email and password.')}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="default-01">{t('Email')} <span
                                                        className="text-danger">*</span></label>
                                                </div>
                                                <div className="form-control-wrap">
                                                    <input tabIndex="1" type="text" className="form-control form-control-lg"
                                                        id="default-01" placeholder="Enter your email address"
                                                        {...register("email",
                                                            {
                                                                required: ValidateResponse.REQUIRED_MESSAGE,
                                                                pattern: {
                                                                    value: ValidateResponse.MAIL_ACCEPT_VALUE,
                                                                    message: ValidateResponse.MAIL_ACCEPT_MESSAGE,
                                                                },
                                                            })}
                                                    />
                                                    <ErrorMessage errors={errors} name="email" as="p"
                                                        className="validateFail" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-label-group">
                                                    <label className="form-label" htmlFor="password">{t('Password')} <span
                                                        className="text-danger">*</span></label>

                                                    {/*<a  className="link link-primary link-sm"*/}
                                                    {/*   href="html/pages/auths/auth-reset-v2.html">Forgot Password?</a>*/}
                                                </div>
                                                <div className="form-control-wrap">
                                                    <a onClick={togglePassword} href="#" className="form-icon form-icon-right passcode-switch lg"
                                                        data-target="password">
                                                        <em className="passcode-icon icon-show icon ni ni-eye"></em>
                                                        <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                                                    </a>
                                                    <input tabIndex="2" type={passwordType} className="form-control form-control-lg"
                                                        id="password" placeholder="Enter your passcode"
                                                        {...register("password",
                                                            {
                                                                required: ValidateResponse.REQUIRED_MESSAGE,
                                                                minLength: {
                                                                    value: 6,
                                                                    message: ValidateResponse.PASSWORD_MIN_MESSAGE,
                                                                }
                                                            })
                                                        }
                                                    />
                                                    <ErrorMessage errors={errors} name="password" as="p"
                                                        className="validateFail" />

                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button tabIndex="3" id="btnLogin" disabled={disabledBtnSubmit}
                                                    className="btn btn-lg btn-primary btn-block">{t('Sign in')}
                                                </button>
                                            </div>
                                            <div className="form-note-s2 text-center pt-4"> {t('New on our platform?')}
                                                <Link to={ROUTES.REGISTER}> {t('Create an account')}</Link>
                                            </div>
                                            {/*    <div className="text-center pt-4 pb-3">
                                                <h6 className="overline-title overline-title-sap"><span>OR</span></h6>
                                            </div>
                                            <ul className="nav justify-center gx-4">
                                                <li className="nav-item"><a className="nav-link" href="#">Facebook</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#">Google</a></li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state, props) => ({
    user: state.user,
});

const mapDispatch = { LoginAction };

export default connect(mapStateToProps, mapDispatch)(SigninPage);
