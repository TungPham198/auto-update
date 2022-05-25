import React, { useEffect, useState } from "react";

import NavLink from "./core/nav-link";
import NavAdvanced from "./core/nav-link-advandced";
import Preview from "./core/preview";
import TabPanel from "./core/tab-panel";
import { navList, navAdvanceList } from "./router";
import FingerPrintService from "../../service/fingerprint.service";
import { useDispatch, useSelector } from "react-redux";
import Convert from "../../components/convert_object";
import BrowserService from "../../service/browser.service";
import MultiToast from "../../components/defaultToast";
import { handleSetProfileName } from "../../redux/components/browser/browserSilce";
const { faker } = require('@faker-js/faker');
import ROUTES from "../../constants/routes";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function javascript() {
    const $ = require("jquery");
    $(document).ready(function () {
        let navLinkCreate = $(".nav-link-create");
        let tabPanelCreate = $(".tab-pane-create");
        navLinkCreate.first().addClass("active");
        let idActive = $(".nav-link-create.active").attr("href");
        $(idActive).addClass("active show");
    });
}

export default function Create(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const userInfor = useSelector((state) => state.user);
    const loadFingerPrint = useSelector((state) => state.displayConfig);
    const browserConfig = useSelector((state) => state.browserConfig);


    //lấy uuid
    let { uuid } = useParams();
    // lấy config
    console.log(uuid,props.location.state);

    /**
     * get fingerprint and distpatch to redux
     */
    useEffect(() => {
        dispatch(handleSetProfileName(faker.name.findName()));
        FingerPrintService.getNewFingerPrint(userInfor, dispatch, { 'os': Convert.flatformToOS[browserConfig.platform] });
    }, [browserConfig.platform]);


    /**
     * Handle create profile
     */
    const handleCreateProfile = async () => {
        const fingerprint = localStorage.getItem(`${userInfor.uuid}_fingerprint`);
        const result = FingerPrintService.convertFingerPrintToConfig(fingerprint, browserConfig)
        await BrowserService.createBrowser(result)
            .then((res) => {
                MultiToast.defaultToast(res);
                props.history.push(ROUTES.WELCOME);
            })
            .catch((err) => {
                MultiToast.defaultToast(err);
            });
    }

    return (
        <div className="nk-content">
            <div className="row min-vh-80">
                <div className="col-9">
                    <div className="d-flex flex-column flex-md-row p-10 h-100">
                        <div className="row w-100">
                            <div className="col-3" id="tab-nav">
                                <ul className="nav nav-tabs nav-tabs-create nav-pills border-0 flex-row flex-md-column mb-3 mb-md-0 fs-6">
                                    {navList.map((navItem, index) => (
                                        <NavLink
                                            key={index}
                                            NavName={navItem.NavName}
                                            NavHref={navItem.NavHref}
                                        />
                                    ))}
                                    <NavAdvanced list={navAdvanceList} />
                                </ul>
                                .
                            </div>
                            <div className="tab-center col-9 h-100 d-flex flex-column ">
                                <div className="card card-bordered card-preview max-height-percent-85 min-height-percent-85">
                                    <div className="tab-content" id="tabContent">
                                        {navList.map((navItem, index) => (
                                            <TabPanel
                                                key={index}
                                                id={navItem.NavHref}
                                                component={navItem.component}
                                            />
                                        ))}
                                        {navAdvanceList.map((navItem, index) => (
                                            <TabPanel
                                                key={index}
                                                id={navItem.NavHref}
                                                component={navItem.component}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="group-button-create max-height-percent-15 min-height-percent-15 d-flex align-items-center justify-content-end gap-1">
                                    <button className="btn btn-dim btn-outline-success" onClick={handleCreateProfile} >
                                        {t('Create Profile')}
                                    </button>
                                    <Link to={ROUTES.WELCOME} className="btn btn-dim btn-outline-danger">
                                        {t('Cancel')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="col-3 card card-bordered card-preview"
                    id="card-preview">
                    <Preview />
                </div>
            </div>
            {loadFingerPrint.loadFingerPrint ? (
                <div className="create-loading">
                    <div className="spinner-border m-5 spinner-border-icon" role="status">
                        <span className="visually-hidden spinner-border-icon-item">{t('Loading...')}</span>
                    </div>
                </div>
            ) : ''}

        </div>


    );
}
