import React, { useEffect, useState, useRef, useCallback } from "react";
import Table from "./table";
import { SelectProvider } from "./select-context";
import { connect, useSelector } from "react-redux";
import ResourceService from "../../api/checkResources";
import { toast } from "react-toastify";
import { CheckResourceDownload } from "../../redux/components/resource/resource";
import useModal from "../../components/defaultModal";

const Welcome = (props) => {
    //total profile
    const [totalProfile, setTotalProfile] = useState(0)
    const getTotal = (total) => {
        setTotalProfile(total)
    }


    //click open modal
    const tableRef = useRef();
    const { isShowing, modalName, modalData, toggle } = useModal();

    const reloadTable = useCallback(() => {
        tableRef.current.reloadTable()
    }, [])

    const openModal = (isShowing, nameAction, data) => {
        toggle(isShowing, nameAction, data)
    }

    return (
        <React.Fragment>
            <SelectProvider>
                <div className="nk-content ">
                    <div className="container wide-xl">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-content-wrap">
                                    <div className="nk-block-head nk-block-head-sm">
                                        <div className="nk-block-between">
                                            <div className="nk-block-head-content">
                                                <h3 className="nk-block-title page-title">Recycle</h3>
                                                <div className="nk-block-des text-soft">
                                                    <p>You deleted {(totalProfile > 1) ? totalProfile + " profiles" : totalProfile + " profile"}.</p>
                                                </div>
                                            </div>
                                            <div className="nk-block-head-content">
                                                <div className="toggle-wrap nk-block-tools-toggle">
                                                    <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1"
                                                        data-target="pageMenu"><em
                                                            className="icon ni ni-menu-alt-r"></em></a>
                                                    <div className="toggle-expand-content" data-content="pageMenu">
                                                        {/* <ul className="nk-block-tools g-3">
                                                            <li className="nk-block-tools-opt d-none d-sm-block">
                                                                <a href="#" className="btn btn-primary"><em
                                                                    className="icon ni ni-plus"></em><span>Add
                                                                        Profile</span></a>
                                                            </li>
                                                            <li className="nk-block-tools-opt d-block d-sm-none">
                                                                <a href="#" className="btn btn-icon btn-primary"><em
                                                                    className="icon ni ni-plus"></em></a>
                                                            </li>
                                                        </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="nk-block">
                                        <Option
                                            openModal={openModal}
                                        />
                                    </div> */}
                                    <div className="nk-block table-block">
                                        <Table
                                            getTotal={getTotal}
                                            ref={tableRef}
                                            openModal={openModal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SelectProvider>
        </React.Fragment>
    );
};

const mapStateToProps = (state, props) => ({
    resources: state.resource,
});
const mapDispatch = { CheckResourceDownload };

export default connect(mapStateToProps, mapDispatch)(Welcome);
