import React, {useCallback, useEffect, useRef, useState} from "react";
import Table from './table';
import Option from "./option";
import {SelectProvider} from './select-context';
import useModal from "../../components/defaultModal";
import ModalAddProxy from "./modal-add";
import ModalImportProxy from "./modal-import";
import {useTranslation} from "react-i18next";

const Proxy = (props) => {
    //total profile
    const [totalProxy, setTotalProxy] = useState(0)
    const getTotal = (total) => {
        setTotalProxy(total)
    }
    const tableRef = useRef();
    const {isShowing, modalName, modalData, toggle} = useModal();

    const reloadTable = useCallback(() => {
        tableRef.current.reloadTable()
    }, []);

    const openModal = (isShowing, nameAction, data) => {
        toggle(isShowing, nameAction, data)
    }
    const [t, i18n] = useTranslation();

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
                                                <h3 className="nk-block-title page-title">{t('Proxies')}</h3>
                                                <div className="nk-block-des text-soft">
                                                    <p>You have
                                                        total {(totalProxy > 1) ? totalProxy + " proxies" : totalProxy + " proxy"}.</p>
                                                </div>
                                            </div>

                                            <div className="nk-block-head-content">
                                                <div className="toggle-wrap nk-block-tools-toggle">
                                                    <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1"
                                                       data-target="pageMenu"><em
                                                        className="icon ni ni-menu-alt-r"></em></a>
                                                    <div className="toggle-expand-content" data-content="pageMenu">
                                                        <ul className="nk-block-tools g-3">
                                                            <li className="nk-block-tools-opt d-none d-sm-block">
                                                                <a href="#" className="btn btn-outline-info"
                                                                   onClick={
                                                                       (e) => {
                                                                           e.preventDefault()
                                                                           openModal(true, 'importProxy')
                                                                       }
                                                                   }
                                                                ><i className="icon la la-file-upload"></i><span>{ t('Import Proxy')}</span></a>
                                                            </li>
                                                            <li className="nk-block-tools-opt d-none d-sm-block">
                                                                <a href="#" className="btn btn-primary"
                                                                   onClick={
                                                                       (e) => {
                                                                           e.preventDefault()
                                                                           openModal(true, 'addProxy')
                                                                       }
                                                                   }
                                                                ><em
                                                                    className="icon ni ni-plus"></em><span>{t('Add Proxy')}</span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-block">
                                        <Option
                                            reloadMainTable = {reloadTable}
                                        />
                                    </div>
                                    <div className="nk-block table-block">
                                        <Table
                                            getTotal={getTotal}
                                            ref={tableRef}
                                            openModal={openModal}
                                        />
                                        <ModalAddProxy
                                            isShowing={isShowing}
                                            modalName={modalName}
                                            data={modalData}
                                            hide={toggle}
                                            reloadMainTable={reloadTable}
                                        />
                                        <ModalImportProxy
                                            isShowing={isShowing}
                                            modalName={modalName}
                                            data={modalData}
                                            hide={toggle}
                                            reloadMainTable={reloadTable}
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
}

export default Proxy;
