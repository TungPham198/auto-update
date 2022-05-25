import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import {
    BASE_URL,
    BASE_URL_V1,
    DELETE_FOLDER,
    USER_DETAIL
} from "../../constants/api";
import { connect, useSelector } from 'react-redux';
import Table from './table';
import Option from "./option";
import { SelectProvider } from './select-context';
import useModal from "../../components/defaultModal";
import ModalShareFolder from "./modal-share-folder";
import ModalAddFolder from "./modal-add-folder";
import MultiToast from "../../components/defaultToast";

const Folder = (props) => {
    //total profile
    const [totalProfile, setTotalProfile] = useState(0)
    const getTotal = (total) => {
        setTotalProfile(total)
    }

    //click open modal
    const tableRef = useRef();
    const { isShowing, modalName, modalData, toggle } = useModal();
    const modelAddFolder = useModal();

    const reloadTable = useCallback(() => {
        tableRef.current.reloadTable()
    }, [])

    const openModal = (isShowing, nameAction, data) => {
        toggle(isShowing, nameAction, data)
    }
    const handleOpenModalAddFolder = (e) => {
        e.preventDefault();
        openModal(true, 'addFolder', null)
    }

    const handleDelete = (arrUUID) => {
        console.log(arrUUID);

        let method = 'post';
        let url = BASE_URL + DELETE_FOLDER;
        let dataForm = {
            uuid_folder: arrUUID
        }
        axios({
            method: method,
            url: url,
            data: dataForm
        }).then(res => {
            reloadTable();
            MultiToast.defaultToast(res);
        }).catch(error => {
            MultiToast.defaultToast(error);
        }
        );
        console.log(method, url);
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
                                                <h3 className="nk-block-title page-title">Folders</h3>
                                                <div className="nk-block-des text-soft">
                                                    <p>You have
                                                        total {(totalProfile > 1) ? totalProfile + " folders" : totalProfile + " folder"}.</p>
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
                                                                <a href="#" className="btn btn-primary" onClick={handleOpenModalAddFolder}><em
                                                                    className="icon ni ni-plus"></em>
                                                                    <span>Add Folder</span></a>
                                                            </li>
                                                            <li className="nk-block-tools-opt d-block d-sm-none">
                                                                <a href="#" className="btn btn-icon btn-primary"><em
                                                                    className="icon ni ni-plus"></em></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-block">
                                        <Option handleDelete={handleDelete} />
                                    </div>
                                    <div className="nk-block table-block">
                                        <Table
                                            getTotal={getTotal}
                                            ref={tableRef}
                                            openModal={openModal}
                                            handleDelete={handleDelete}
                                        />
                                    </div>
                                    <ModalShareFolder
                                        isShowing={isShowing}
                                        modalName={modalName}
                                        data={modalData}
                                        hide={toggle}
                                        reloadMainTable={reloadTable}
                                    />
                                    <ModalAddFolder
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
            </SelectProvider>
        </React.Fragment>
    );
}

export default Folder;
