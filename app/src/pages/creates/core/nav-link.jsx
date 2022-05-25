import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import displayConfigSilce, { handleChangeCreateTabActive } from "../../../redux/components/display/displayConfigSilce";

function NavLink(props) {
    const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const dispalyState = useSelector((state) => state.displayConfig);
  let navHrefConvert = "#" + props.NavHref;

  function handleClickNav(e) {
    e.preventDefault();
    dispatch(
      handleChangeCreateTabActive(e.target.attributes.href.value.replace('#',''))
    );
  }
  return (
    <li className="nav-item w-md-150px">
      <a
        className={
          dispalyState.createTabActive == props.NavHref
            ? "nav-link nav-link-create active"
            : "nav-link nav-link-create"
        }
        data-bs-toggle="tab"
        onClick={handleClickNav}
        href={navHrefConvert}>
        {props.NavName}
      </a>
    </li>
  );
}

export default NavLink;
