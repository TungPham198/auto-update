import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../../../components/defaultModal";
import ModalListProxy from "../modals/modal-list-proxy";
import { handleSetProxy } from "./../../../redux/components/browser/browserSilce";
import {toast} from "react-toastify";

import checkProxy from "../../../service/proxy.service";
import { useTranslation } from "react-i18next";

function formatProxy(proxy, key, value) {
    key.map((itemKey, index) => {
        proxy[itemKey] = value[index];
    });
    return proxy;
}



function Proxy(props) {
    const [t, i18n] = useTranslation();
    const dispatch = useDispatch();
    const proxyState = useSelector((state) => state.browserConfig.proxy);
    
   

    let checkProxyExample = {
        status: '',
        ip: "45.58.61.166",
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
    }
    const [checkProxydata, setCheckProxy] = useState(checkProxyExample);
    const [urlCheckProxy,setUrlCheckProxy] = useState("Ipinfo.io")
    //click open modal
    const { isShowing, modalName, modalData, toggle } = useModal();

    let status = proxyState.type == "Without proxy" ? false : true;
    let proxyType = proxyState.type;
    let proxyIPInput = proxyState.ip;
    let proxiPortInput = proxyState.port;
    let proxiUsername = proxyState.user;
    let proxiPassword = proxyState.pass;

    const handleChangeTypeProxy = (e) => {
        dispatch(
            handleSetProxy(formatProxy({ ...proxyState }, ["type"], [e.target.value]))
        );
    };

    const handleChangeIPInput = (e) => {
        dispatch(
            handleSetProxy(formatProxy({ ...proxyState }, ["ip"], [e.target.value]))
        );
    };

    const handleChangePortInput = (e) => {
        dispatch(
            handleSetProxy(formatProxy({ ...proxyState }, ["port"], [e.target.value]))
        );
    };

    const handleChangeUsernameInput = (e) => {
        dispatch(
            handleSetProxy(formatProxy({ ...proxyState }, ["user"], [e.target.value]))
        );
    };

    const handleChangePasswordInput = (e) => {
        dispatch(
            handleSetProxy(formatProxy({ ...proxyState }, ["pass"], [e.target.value]))
        );
    };
    const handleButtonDelete = (e) => {
        // Object.keys({proxyState}).map((key)=>proxyState[key]='');
        let keys = Object.keys(proxyState);
        let value = keys.map((item, index) =>
            item == "type" ? "Without proxy" : ""
        );

        dispatch(handleSetProxy(formatProxy({ ...proxyState }, keys, value)));
    };
    // const handleButtonHistory = (e) => {
    //   // $('#proxyModal').addClass('show d-block')
    // };

    const handleButtonCheckProxy = (e) => {
      toast.info("Start check proxy");

      checkProxy(urlCheckProxy,proxyState,(data)=>{
          if(data.status == "live"){
            console.log(data)
            toast.success("Proxy "+data.status)
          }
          else{
            toast.error("Proxy "+data.status);
          }
          setCheckProxy({
            status: data.status,
            ip: data.info.ip,
            loc: data.info.loc,
            org: data.info.org,
            city: data.info.city,
            postal: data.info.postal,
            region:data.info.region,
            country: data.info.country,
            hostname: data.info.hostname,
            timezone: data.info.timezone,
          })
          window.api.mb_ipcRenderer.removeAllListeners("kit_checkproxy_reply");
      });
    };
  
   const handleChangeCheckHost = (e) => {
      setUrlCheckProxy(e.target.value)
    };
    console.log(checkProxydata)
    return (
        <div className="card-inner">
            <div className="preview-block">
                <span className="preview-title-lg overline-title">{t('Proxy')}</span>
                <div className="form-group w-50">
                    <label className="form-label" htmlFor="proxy-type">
                        {t('Proxy type')}
                    </label>
                    <div className="form-control-wrap ">
                        <div className="form-control-select">
                            <select
                                className="form-control"
                                id="proxy-type"
                                value={proxyType}
                                onChange={handleChangeTypeProxy}>
                                <option value="Without proxy">{t('Without proxy')}</option>
                                <option value="HTTP">{t('HTTP proxy')}</option>
                                <option value="SOCK4">{t('Socks 4 proxy')}</option>
                                <option value="SOCK5">{t('Socks 5 proxy')}</option>
                                <option value="SSH">{t('SSH (Proxy Over SSH)')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {status ? (
                    <div className="proxy-group">
                        <div className="form-group w-60">
                            <label className="form-label" htmlFor="ip-address">
                                {t('IP Address')}
                            </label>
                            <div className="form-control-wrap row">
                                <div className="form-control-wrap col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ip-address"
                                        placeholder="IP Address"
                                        value={proxyIPInput}
                                        onChange={handleChangeIPInput}
                                    />
                                </div>
                                <div className="form-control-wrap col-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ip-address-port"
                                        placeholder="Port"
                                        value={proxiPortInput}
                                        onChange={handleChangePortInput}
                                    />
                                </div>
                                <div className="form-control-wrap col-2 d-flex proxy-group-gap">
                                    <button
                                        className="btn-modal btn btn-dim btn-outline-secondary"
                                        id="btnProxyModal"
                                        onClick={() => toggle(true, "proxyList", null)}>
                                        <i className="fas fa-history"></i>
                                    </button>
                                    <button
                                        className="btn btn-dim btn-outline-warning"
                                        onClick={handleButtonDelete}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <label className="form-label" htmlFor="proxy-uname">
                                {t('Username')}
                            </label>
                            <div className="form-control-wrap">
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="proxy-uname"
                                        placeholder="Username"
                                        value={proxiUsername}
                                        onChange={handleChangeUsernameInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group w-50">
                            <label className="form-label" htmlFor="proxy-password">
                                {t('Password')}
                            </label>
                            <div className="form-control-wrap">
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="proxy-password"
                                        placeholder="Password"
                                        value={proxiPassword}
                                        onChange={handleChangePasswordInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="d-block">
                            <div className="form-group w-50">
                                <label className="form-label" htmlFor="proxy-check-host">
                                    {t('Check Proxy Host')}
                                </label>
                                <div className="form-control-wrap ">
                                    <div className="form-control-select">
                                        <select className="form-control" onChange={handleChangeCheckHost} id="proxy-check-host">
                                            <option value="Ipinfo.io">Ipinfo.io</option>
                                            <option value="Ipgeolocation.io">Ipgeolocation.io</option>
                                            <option value="api.ip.sb">api.ip.sb</option>
                                            <option value="Browserleaks.com">Browserleaks.com</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group w-50">
                                <button className="btn btn-dim btn-outline-info" onClick={handleButtonCheckProxy} >
                                    {t('Check Proxy')}
                                </button>
                            </div>
                            {checkProxydata.status == 'live' ? (
                                <div className="form-group w-50 text-success">
                                    <div className="d-block">
                                        <span>{t('ip')}: </span>
                                        <span>{checkProxydata.ip}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('loc')}: </span>
                                        <span>{checkProxydata.loc}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('org')}: </span>
                                        <span>{checkProxydata.org}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('city')}: </span>
                                        <span>{checkProxydata.city}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('postal')}: </span>
                                        <span>{checkProxydata.postal}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('region')}: </span>
                                        <span>{checkProxydata.region}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('country')}: </span>
                                        <span>{checkProxy.country}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('hostname')}: </span>
                                        <span>{checkProxydata.hostname}</span>
                                    </div>
                                    <div className="d-block">
                                        <span>{t('timezone')}: </span>
                                        <span>{checkProxydata.timezone}</span>
                                    </div>
                                </div>
                            ) : ''}
                            {checkProxydata.status == 'die' ? (
                                <div className="form-group w-50 text-danger">
                                    <div className="d-block">
                                        <span>{t('Proxy')}: </span>
                                        <span>{t('Die')}</span>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <ModalListProxy
                isShowing={isShowing}
                modalName={modalName}
                data={modalData}
                hide={() => {
                    toggle(false, "proxyList");
                }}
            />
        </div>
    );
}

export default Proxy;
