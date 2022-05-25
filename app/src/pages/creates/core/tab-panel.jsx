import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function TabPanel(props) {
    const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const dispalyState = useSelector((state) => state.displayConfig);

  return (
    <div
      className={dispalyState.createTabActive == props.id ?"tab-pane tab-pane-create fade show active" :"tab-pane tab-pane-create fade show"}
      id={props.id}
      role="tabpanel">{React.createElement(props.component)}
    </div>
  );
}

export default TabPanel;
