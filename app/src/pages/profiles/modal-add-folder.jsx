import React, {useEffect, useState, memo} from "react";
import {ADD_FOLDER, ADD_PROFILE_TO_FOLDER, BASE_URL_V1, FOLDER_TABLE} from "../../constants/api";
import axios from "axios";
import ReactPaginate from "react-paginate";
import MultiToast from "../../components/defaultToast";
import {INVALID_MESSAGE, REQUIRED_MESSAGE} from "../../constants/ValidateResponse";

function ModalAddFolder({isShowing, modalName, data, hide, reloadMainTable}) {
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let limit = 10;
    let nameModal = 'addToFolder';

    const getDefault = async () => {
        axios.get(BASE_URL_V1 + FOLDER_TABLE + `?page=${currentPage}&limit=${limit}`).then(res => {
            const data = res.data;
            const total = data.meta.total;
            setpageCount(Math.ceil(total / limit));
            setItems(data.data.content);
        }).catch(error => {
                MultiToast.defaultToast(error)
            }
        )
    };
    useEffect(() => {
        if (isShowing && modalName.includes(nameModal))
        getDefault();
    }, [isShowing, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    //create folder
    const [folderName, setFolderName] = useState('');
    const [errors, setErrors] = useState('');

    const createFolder = () => {
        let check = validate(folderName)
        setErrors(check)
        if (check === '') {
            axios.post(BASE_URL_V1 + ADD_FOLDER, {
                name: folderName
            }).then(res => {
                MultiToast.defaultToast(res)
                getDefault()
            }).catch(error => {
                    MultiToast.defaultToast(error)
                }
            )
        }
    }

    const validate = (values) => {
        let error = '';
        const regex = /^[a-zA-Z0-9]*$/i;
        if (!values) {
            error = REQUIRED_MESSAGE;
        } else if (!regex.test(values)) {
            error = INVALID_MESSAGE;
        }
        return error;
    }

    // add profile to folder
    const addProfile = (folder_id) => {
        axios.post(BASE_URL_V1 + ADD_FOLDER + '/' + folder_id + ADD_PROFILE_TO_FOLDER, {
            uuid_browser: data.id
        }).then(res => {
            MultiToast.defaultToast(res)
            hide(false, nameModal)
            reloadMainTable()
        }).catch(error => {
                MultiToast.defaultToast(error)
            }
        )
    }

    return (
        <div className={((isShowing && modalName.includes(nameModal))) ? "modal fade show d-block" : "modal fade"}
             tabIndex="-1" id="proxyModal">
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content modal-content-md">
                    <button className="close btn-close-modal"
                            onClick={() => hide(false, nameModal)}
                    >
                        <em className="icon ni ni-cross"></em>
                    </button>
                    <div className="modal-header">
                        <h5 className="modal-title">Add profile to folder</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group group-add-center">
                            <label className="form-label pe-2" htmlFor="add_folder">Add new folder:</label>
                            <div className="form-control-wrap pe-2">
                                <input type="text" className="form-control" id="add_folder"
                                       placeholder="folder name..."
                                       value={folderName}
                                       onChange={e => {
                                           setFolderName(e.target.value)
                                       }}
                                />
                                <span className="invalid">{errors}</span>
                            </div>
                            <a href="#" className="btn btn-sm btn-outline-primary btn-status"
                               onClick={createFolder}
                            >Create</a>
                        </div>
                        <div className="card-inner p-0">
                            <table className="table nk-tb-list nk-tb-ulist">
                                <thead className="table-light">
                                <tr className="nk-tb-item nk-tb-head">
                                    <th className="nk-tb-col text-center first-col"><span
                                        className="sub-text">STT</span></th>
                                    <th className="nk-tb-col text-center"><span
                                        className="sub-text">Name</span></th>
                                    <th className="nk-tb-col text-end ps-4"><span
                                        className="sub-text">profiles</span></th>
                                    <th className="nk-tb-col text-end pe-5"> <span
                                        className="sub-text">Action</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {(items.length > 0) ? (items.map((item, index) => {
                                    return (
                                        <tr key={item.uuid} className="nk-tb-item">
                                            <td className="nk-tb-col first-col">
                                                <span>{(index + 1) + ((currentPage - 1) * 10)}</span>
                                            </td>
                                            <td className="nk-tb-col">
                                                <span><em className="icon ni ni-folder-fill"></em> {item.name}</span>
                                            </td>
                                            <td className="nk-tb-col text-end">
                                                <span>{(item.total_browser > 1) ? (item.total_browser + ' profiles') : (item.total_browser + ' profile')}</span>
                                            </td>
                                            <td className="nk-tb-col text-end">
                                                <a href="#" data-key={item.uuid}
                                                   className={((data.folder_id === item.id) ? "btn btn-sm btn-light btn-status disabled" : "btn btn-sm btn-primary btn-status")}
                                                   onClick={() => addProfile(item.uuid)}
                                                >Add</a>
                                            </td>
                                        </tr>
                                    );
                                })) : (
                                    <tr>
                                        <td className="text-center p-3" colSpan="5"><span>Data is empty.</span></td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-inner">
                            <div className="nk-block-between-md g-3 paginate-box">
                                <div className="g">
                                    <ReactPaginate
                                        previousLabel={"Prev"}
                                        nextLabel={"next"}
                                        breakLabel={'<em className=\"icon ni ni-more-h\"></em></span>'}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination justify-content-center justify-content-md-start"}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalAddFolder);