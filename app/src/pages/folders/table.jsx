import ReactPaginate from "react-paginate";
import { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import React from "react";
import axios from "axios";
import { selectFolderContext } from './select-context';
import { BASE_URL_V1, FOLDER_TABLE, FOLDER_SHARED_TABLE } from "../../constants/api";
import DateTime from "../../components/dateTime";

function Table({ getTotal, openModal ,handleDelete}, ref) {
    // get table's data
    const [type, setType] = useState('owner');
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    let limit = 10;
    let baseUrl;
    switch (type) {
        case 'owner': {
            baseUrl = BASE_URL_V1 + FOLDER_TABLE;
            break;
        }
        case 'shared': {
            baseUrl = BASE_URL_V1 + FOLDER_SHARED_TABLE;
            break;
        }
    }
    const getDefault = async () => {
        axios.get(baseUrl + `?page=${currentPage}&limit=${limit}`).then(res => {
            const data = res.data;
            const total = data.meta.total;
            getTotal(total);
            setpageCount(Math.ceil(total / limit));
            setItems(data.data.content);
            selectContext.resetChecked();
        })
    };

    useEffect(() => {
        getDefault();
    }, [type, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        // scroll to the top
        //window.scrollTo(0, 0)
    };

    //select all checkbox
    const selectContext = useContext(selectFolderContext);

    const handleType = (data) => {
        setType(data)
    };


    useImperativeHandle(ref, () => ({
        reloadTable() {
            getDefault()
        },
    }))

    return (
        <div className="card card-bordered card-stretch">
            <div className="card-inner-group">
                <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
                        <div className="card-tools">
                            <div className="form-inline flex-nowrap gx-3">
                                <a href="#"
                                    className={type == 'owner' ? 'btn btn-primary me-2' : 'btn btn-light me-2'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleType('owner')
                                    }}
                                >
                                    <i className="las la-user"></i>
                                    <span>Your Folders</span>
                                    {type == 'owner' ? <em className="icon ni ni-chevron-down"></em> :
                                        <em className="icon ni ni-chevron-right"></em>}
                                </a>
                                <a href="#"
                                    className={type == 'shared' ? 'btn btn-primary me-2' : 'btn btn-light me-2'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleType('shared')
                                    }}
                                >
                                    <i className="las la-folder-open"></i>
                                    <span>Shared Folders</span>
                                    {type == 'shared' ? <em className="icon ni ni-chevron-down"></em> :
                                        <em className="icon ni ni-chevron-right"></em>}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-search search-wrap" data-search="search">
                        <div className="card-body">
                            <div className="search-content">
                                <a href="#" className="search-back btn btn-icon toggle-search" data-target="search"
                                    onClick={e => e.preventDefault()}
                                ><em
                                    className="icon ni ni-arrow-left"></em></a>
                                <input type="text" className="form-control border-transparent form-focus-none"
                                    id="search_box"
                                    placeholder="Search by name" />
                                <button className="search-submit btn btn-icon"><em className="icon ni ni-search"></em>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-inner p-0">
                    <table className="nk-tb-list nk-tb-ulist">
                        <thead>
                            <tr className="nk-tb-item nk-tb-head">
                                <th className="nk-tb-col nk-tb-col-check">
                                    <div
                                        className="custom-control custom-control-sm custom-checkbox notext">
                                        <input type="checkbox"
                                            className="custom-control-input"
                                            id="pid-all"
                                            name="selectAll"
                                            onChange={selectContext.handleSelectAll(items)}
                                            checked={selectContext.isCheckAll}
                                        />
                                        <label className="custom-control-label"
                                            htmlFor="pid-all"></label>
                                    </div>
                                </th>
                                <th className="nk-tb-col"><span className="sub-text ms-5">Name</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">Profiles</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">Created/Shared at</span></th>
                                <th className="nk-tb-col nk-tb-col-tools text-end"><span
                                    className="sub-text">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(items.length > 0) ? (items.map((item) => {
                                return (
                                    <tr key={item.uuid} className="nk-tb-item">
                                        <td className="nk-tb-col nk-tb-col-check">
                                            <div
                                                className="custom-control custom-control-sm custom-checkbox notext">
                                                <input type="checkbox"
                                                    className="custom-control-input"
                                                    name="select_Profile"
                                                    id={item.uuid}
                                                    onChange={selectContext.handleClick}
                                                    checked={selectContext.isCheck.includes(item.uuid)}
                                                />
                                                <label className="custom-control-label"
                                                    htmlFor={item.uuid}></label>
                                            </div>
                                        </td>
                                        <td className="nk-tb-col">
                                            <span><em className="icon ni ni-folder-fill"></em> {item.name}</span>
                                        </td>
                                        <td className="nk-tb-col text-center">
                                            <span>{(item.total_browser > 1) ? (item.total_browser + ' profiles') : (item.total_browser + ' profile')}</span>
                                        </td>
                                        <td className="nk-tb-col text-center">
                                            <span>{DateTime.formatDate(item.created_at)}</span>
                                        </td>
                                        <td className="nk-tb-col nk-tb-col-tools">
                                            <ul className="nk-tb-actions gx-1">
                                                <li>
                                                    <div className="dropdown">
                                                        <a href="#"
                                                            onClick={e => e.preventDefault()}
                                                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                                            data-bs-toggle="dropdown"><em
                                                                className="icon ni ni-more-h"></em></a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-end">
                                                            <ul className="link-list-opt no-bdr">
                                                                <li>
                                                                    <a href="#"
                                                                        onClick={
                                                                            (e) => {
                                                                                e.preventDefault()
                                                                                openModal(true, 'shareFolder', { id: item.uuid })
                                                                            }
                                                                        }
                                                                    ><span>Share</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onClick={e => {
                                                                        e.preventDefault();
                                                                        openModal(true, 'addFolder', item);
                                                                    }}><span>Rename</span></a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" onClick={e=>{
                                                                        e.preventDefault();
                                                                        handleDelete([item.uuid])
                                                                    }}><span>Delete</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                )
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
                                breakLabel={"..."}
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
    );
}

export default forwardRef(Table);