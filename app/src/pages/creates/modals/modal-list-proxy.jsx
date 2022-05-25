import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { handleSetProxy } from "../../../redux/components/browser/browserSilce";

function ModalListProxy({ isShowing, modalName, data, hide }) {
    const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const listProxy = [
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd031",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SSH",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd032",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK5",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd033",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK4",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd034",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SSH",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd035",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK5",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd036",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK4",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd037",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SSH",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd038",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK5",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd039",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK4",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd0310",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SSH",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd0311",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK5",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
    {
      uuid: "964579f6-d6b1-4d87-9291-6df8d96abd0312",
      title: "s1",
      ip: "45.58.61.166",
      port: "22",
      user: "proxysock",
      pass: "ZJXPuB9uqN",
      type: "SOCK4",
      country: "US",
      note: "",
      details: {
        ip: "45.58.61.166",
        asn: {
          asn: "AS201106",
          name: "Spartan Host Ltd",
          type: "hosting",
          route: "45.58.61.0/24",
          domain: "spartanhost.org",
        },
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
      },
      browsers_count: 0,
      created_at: "2022-05-11T06:43:51.000000Z",
    },
  ];

  const [checkedProxy, setCheckProxy] = useState({
    uuid: "",
    title: "",
    ip: "",
    port: "",
    user: "",
    pass: "",
    type: "",
    country: "",
    note: "",
    details: "",
    browsers_count: "",
    created_at: "",
  });

  const handleChangCheckedProxy = (e) => {
    setCheckProxy(listProxy.find((proxy) => proxy.uuid == e.target.value));
  };
  const handleSubmitProxyHistory = (e) => {
    dispatch(handleSetProxy(checkedProxy));
    hide();
  };
  return (
    <div
      className={
        isShowing && modalName.includes("proxyList")
          ? "modal fade show d-block"
          : "modal fade"
      }
      tabIndex="-1"
      id="proxyModal">
      <div className="modal-dialog" id="proxyModalDialog" role="document">
        <div className="modal-content" id="proxyModalConten">
          <button className="close btn-close-modal" onClick={hide}>
            <em className="icon ni ni-cross"></em>
          </button>
          <div className="modal-header">
            <h5 className="modal-title">{t('Proxy List')}</h5>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th scope="col">{t('Action')}</th>
                  <th scope="col">{t('Type')}</th>
                  <th scope="col">{t('IP')}</th>
                  <th scope="col">{t('Port')}</th>
                  <th scope="col">{t('User name')}</th>
                  <th scope="col">{t('Password')}</th>
                  <th scope="col">{t('Country')}</th>
                  <th scope="col">{t('Profile')}</th>
                </tr>
              </thead>
              <tbody>
                {listProxy.map((proxy, index) => (
                  <tr key={proxy.uuid} className="custom-checkbox">
                    <td className="nk-tb-col nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="radio"
                          className="custom-control-input"
                          name="select_Profile"
                          id={"proxy_input-" + proxy.uuid}
                          value={proxy.uuid}
                          onChange={handleChangCheckedProxy}
                          // checked={selectContext.isCheck.includes(item.uuid)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={"proxy_input-" + proxy.uuid}></label>
                      </div>
                    </td>
                    <td>{proxy.type}</td>
                    <td>{proxy.ip}</td>
                    <td>{proxy.port}</td>
                    <td>{proxy.user}</td>
                    <td>{proxy.pass}</td>
                    <td>{proxy.country}</td>
                    <td>{proxy.browsers_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-inner">
            <div className="nk-block-between-md g-3 paginate-box">
              <div className="g">
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"next"}
                  breakLabel={'<em className="icon ni ni-more-h"></em></span>'}
                  pageCount={5}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={2}
                  containerClassName={
                    "pagination justify-content-center justify-content-md-start"
                  }
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button
              className="btn btn-dim btn-outline-primary"
              onClick={handleSubmitProxyHistory}>
              {t('Submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalListProxy;
