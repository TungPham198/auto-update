import React, { useEffect } from "react";
import ROUTES from "Constants/routes";
import { connect } from "react-redux";
import UserService from "../service/user.service";
import { UserDetails } from "../redux/components/user/userDetailSlice";
import { LogOut } from "../redux/components/user/userSlice";
import { Link, NavLink } from "react-router-dom";
import MultiToast from "../components/defaultToast";
import { useTranslation } from 'react-i18next';

const Nav = (props) => {

    if (!props.user.isAuthUser) return '';

    const userDetail = props.userDetails;

    const handeLogout = () => {
        props.LogOut()
    }

    const toHome = () => {
        props.history.push(ROUTES.WELCOME)
    }

    useEffect(() => {

        // request user details
        const getUserDefault = async () => {
            UserService.getInforDefault()
                .then((response) => {
                    if (response.data.type === 'success') {
                        props.UserDetails(response.data.content)
                    }
                })
                .catch(error => {
                    MultiToast.defaultToast(error)
                })
        };

        getUserDefault();
    }, []);
    const [t, i18n] = useTranslation();
    return (


        <React.Fragment>
            <div className="nk-header nk-header-fixed is-theme">
                <div className="container-lg wide-xl">
                    <div className="nk-header-wrap">
                        <div className="nk-header-brand">
                            <a onClick={() => toHome()} className="logo-link">
                                <svg width="36" height="36" viewBox="0 0 144 138" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.9423 131.872L80.1156 103.961H65.0839L30.623 120.166L31.9423 131.872Z"
                                        fill="white" />
                                    <path d="M80.1156 103.961V110.053L31.9424 137.964V130.638L80.1156 103.961Z"
                                        fill="#DADADA" />
                                    <path d="M0 137.964H31.9423L81.7147 51.6022L80.1555 0L0 137.964Z" fill="#EAEAEA" />
                                    <path d="M79.9155 54.7079L80.1554 0L144 110.132H111.938L79.9155 54.7079Z"
                                        fill="white" />
                                    <path d="M80.1558 0V11.1088L120.134 69.002L80.1558 0Z" fill="#EAEAEA" />
                                    <path d="M80.1956 0V11.1088L40.2178 69.002L80.1956 0Z" fill="white" />
                                    <path d="M70.7607 92.9736H79.9157V77.2461L70.7607 92.9736Z" fill="white" />
                                    <path d="M79.9155 77.2461V92.9736H89.0305L79.9155 77.2461Z" fill="#DADADA" />
                                </svg>

                                <h4 className="logo-multibrowser">Multibrowser</h4>
                            </a>
                        </div>
                        <div className="nk-header-menu">
                            <ul className="nk-menu nk-menu-main">

                                <li className="nk-menu-item current-page">
                                    <NavLink to={ROUTES.CREATE} className="nk-menu-link" exact
                                        activeStyle={{ color: 'white', borderBottom: '1px solid' }}>{ t('New Profile')}</NavLink>
                                </li>
                                <li className="nk-menu-item current-page">
                                    <NavLink to={ROUTES.WELCOME} className="nk-menu-link" exact activeStyle={{
                                        color: 'white',
                                        borderBottom: '1px solid'
                                    }}>Profiles</NavLink>
                                </li>
                                <li className="nk-menu-item current-page">
                                    <NavLink to={ROUTES.FOLDER} className="nk-menu-link" exact
                                        activeStyle={{ color: 'white', borderBottom: '1px solid' }}>{ t('Folders')}</NavLink>
                                </li>
                                <li className="nk-menu-item current-page">
                                    <NavLink to={ROUTES.PROXY} className="nk-menu-link" exact
                                        activeStyle={{ color: 'white', borderBottom: '1px solid' }}>Proxies</NavLink>
                                </li>
                                {/* <li className="nk-menu-item current-page">
                                    <NavLink to={ROUTES.RECYCLE} className="nk-menu-link" exact activeStyle={{ color: 'white', borderBottom: '1px solid' }}>Recycle</NavLink>
                                </li> */}
                            </ul>
                        </div>
                        <div className="nk-header-tools">
                            <ul className="nk-quick-nav">
                                {/* <li className="dropdown language-dropdown d-none d-sm-block me-n1">
                  <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                    <div className="quick-icon border border-light">
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end dropdown-menu-s1">
                    <ul className="language-list">
                      <li>
                        <a href="#" className="language-item">
                          <img src="./assets/images/flags/english.png" alt=""
                            className="language-flag" />
                          <span className="langgit uage-name">English</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="language-item">
                          <img src="./assets/images/flags/spanish.png" alt=""
                            className="language-flag" />
                          <span className="language-name">Español</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="language-item">
                          <img src="./assets/images/flags/french.png" alt=""
                            className="language-flag" />
                          <span className="language-name">Français</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="language-item">
                          <img src="./assets/images/flags/turkey.png" alt=""
                            className="language-flag" />
                          <span className="language-name">Türkçe</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li> */}
                                <li className="dropdown notification-dropdown">
                                    <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                        <div className="icon-status icon-status-info"><em
                                            className="icon ni ni-bell"></em>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end dropdown-menu-s1">
                                        <div className="dropdown-head">
                                            <span className="sub-title nk-dropdown-title">Notifications</span>
                                            <a href="#">Mark All as Read</a>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="nk-notification">
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to
                                                            <span>Widthdrawl</span>
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit
                                                            Order</span> is placed
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to
                                                            <span>Widthdrawl</span>
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit
                                                            Order</span> is placed
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-warning-dim ni ni-curve-down-right"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">You have requested to
                                                            <span>Widthdrawl</span>
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                                <div className="nk-notification-item dropdown-inner">
                                                    <div className="nk-notification-icon">
                                                        <em
                                                            className="icon icon-circle bg-success-dim ni ni-curve-down-left"></em>
                                                    </div>
                                                    <div className="nk-notification-content">
                                                        <div className="nk-notification-text">Your <span>Deposit
                                                            Order</span> is placed
                                                        </div>
                                                        <div className="nk-notification-time">2 hrs ago</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-foot center">
                                            <a href="#">View All</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="dropdown user-dropdown">
                                    <a href="#" className="dropdown-toggle me-lg-n1" data-bs-toggle="dropdown">
                                        <div className="user-toggle">
                                            <div className="user-avatar sm">
                                                <em className="icon ni ni-user-alt"></em>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1">
                                        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                            <div className="user-card">
                                                <div className="user-avatar">
                                                    <span>AB</span>
                                                </div>
                                                <div className="user-info">
                                                    <span className="lead-text">{userDetail.name ?? ''}</span>
                                                    <span className="sub-text">{userDetail.email ?? ''}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="dropdown-inner">*/}
                                        {/*    <ul className="link-list">*/}
                                        {/*        <li><a href="/"><em*/}
                                        {/*                    className="icon ni ni-user-alt"></em><span>View*/}
                                        {/*                    Profile</span></a></li>*/}
                                        {/*        <li><a href="/"><em*/}
                                        {/*                    className="icon ni ni-setting-alt"></em><span>Account*/}
                                        {/*                    Setting</span></a></li>*/}
                                        {/*        <li><a href="/"><em*/}
                                        {/*                    className="icon ni ni-activity-alt"></em><span>Login*/}
                                        {/*                    Activity</span></a></li>*/}
                                        {/*        <li><a className="dark-switch" href="#"><em*/}
                                        {/*                    className="icon ni ni-moon"></em><span>Dark Mode</span></a>*/}
                                        {/*        </li>*/}
                                        {/*    </ul>*/}
                                        {/*</div>*/}
                                        <div className="dropdown-inner">
                                            <ul className="link-list">
                                                <li>
                                                    <Link to={'#'}>
                                                        <em className="icon ni ni-setting"></em>
                                                        <span>Settings</span></Link>
                                                </li>
                                            </ul>
                                            <ul className="link-list">
                                                <li>
                                                    <Link to={ROUTES.RECYCLE}>
                                                        <em className="icon fas fa-trash-alt"></em>
                                                        <span>Recycle</span></Link>
                                                </li>
                                            </ul>
                                            <ul className="link-list">
                                                <li>
                                                    <Link to={'#'} onClick={() => handeLogout()}>
                                                        <em className="icon ni ni-signout"></em>
                                                        <span>Sign out</span></Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="d-lg-none">
                                    <a href="#" className="toggle nk-quick-nav-icon me-n1" data-target="sideNav"><em
                                        className="icon ni ni-menu"></em></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state, props) => ({
    user: state.user,
    userDetails: state.userDetails,
});

const mapDispatch = { LogOut, UserDetails };

export default connect(mapStateToProps, mapDispatch)(Nav);
