import React, { Fragment } from "react";
import NavLink from "./nav-link";
import { navAdvanceList } from "../router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function NavAdvanced(props) {
    const [t, i18n] = useTranslation();
  const dispalyState = useSelector((state) => state.displayConfig);
  let checkIncludeNav = navAdvanceList
    .map((navAdvanItem) => navAdvanItem.NavHref)
    .includes(dispalyState.createTabActive);
  return (
    <div
      data-kt-menu-trigger="click"
      id="nav-menu-advance"
      className={`menu-item menu-accordion ${checkIncludeNav ? "show" : ""}`}>
      <span className="d-block nk-menu-toggle">
        <span className="menu-title nav-link nk-menu-text">{t('Advanced')}</span>
        <span className=""></span>
      </span>
      <div
        className={`menu-sub menu-sub-accordion nav-sub-menu-advance ${
          checkIncludeNav ? "show" : "hiden-menu-create"
        }`}
        kt-hidden-height="98">
        {props.list.map((item, index) => (
          <div className="menu-link" key={index}>
            <span className="menu-bullet">
              <span className="bullet bullet-dot"></span>
            </span>
            <NavLink NavName={item.NavName} NavHref={item.NavHref} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default NavAdvanced;
