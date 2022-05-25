import ReactPaginate from "react-paginate";
import React from "react";
import { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { SelectContext } from './select-context';
import { BASE_URL, BASE_URL_V1, RECYCLE_LIST, RESTORE_BROWSER } from "../../constants/api";
import MultiToast from "../../components/defaultToast";
import { AddBrowser, RemoveBrowser } from "../../redux/components/browser/browserControllerSlice";

const Table = forwardRef((props, ref) => {
    const getTotal = props.getTotal
    // select all checkbox
    const selectContext = useContext(SelectContext);
    // get table's data
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    //call list table
    let limit = 10;
    let baseUrlGetListRecycle = BASE_URL + RECYCLE_LIST;
    let baseUrlRestore = BASE_URL_V1 + RESTORE_BROWSER;

    const getDefault = async () => {
        axios.get(baseUrlGetListRecycle + `?page=${currentPage}&limit=${limit}`).then(res => {
            const data = res.data;
            const total = data.meta.total;
            getTotal(total);
            setpageCount(Math.ceil(total / limit));
            setItems(data.data.content);
        })
    };

    useEffect(() => {
        getDefault();
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        selectContext.resetChecked();
    };

    useImperativeHandle(ref, () => ({
        reloadTable() {
            getDefault()
        },
    }))

    const handleRestore = (e) => {
        e.preventDefault();
        axios.post(baseUrlRestore, {
            uuid_browser: [e.target.getAttribute('data-id')]
        }).then(res => {
            MultiToast.defaultToast(res)
            getDefault()
        }).catch(error => {
            MultiToast.defaultToast(error)
        }
        )
    }
    const handleRestoreSelect = (e) => {
        e.preventDefault();
        axios.post(baseUrlRestore, {
            uuid_browser: selectContext.isCheck
        }).then(res => {
            MultiToast.defaultToast(res)
            getDefault()
        }).catch(error => {
            MultiToast.defaultToast(error)
        }
        )
    }

    return (
        <div className="card card-bordered card-stretch">
            <div className="card-inner-group">
                <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
                        <div className="card-tools">
                            <div className="form-inline flex-nowrap gx-3">
                                <a href="#" className='btn btn-dim btn-outline-primary me-2' onClick={handleRestoreSelect} >
                                    <i className="fas fa-trash-restore font-size-25px"></i>
                                    <span>&nbsp;Restore select</span>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="card-search search-wrap" data-search="search">
                        <div className="card-body">
                            <div className="search-content">
                                <a href="#" className="search-back btn btn-icon toggle-search" data-target="search"><em
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
                <div className="card-inner p-0" id="tableProfile">
                    <table className="nk-tb-list nk-tb-ulist">
                        <thead className="table-light">
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
                                <th className="nk-tb-col text-center"><span className="sub-text">Browser
                                    Type</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">Name</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">System</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">Version</span></th>
                                <th className="nk-tb-col text-center"><span
                                    className="sub-text">Time remaining</span></th>
                                <th className="nk-tb-col text-center">
                                    <span
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
                                        <td className="nk-tb-col text-center h4">
                                            <span><em className="icon ni ni-b-chrome"></em></span>
                                        </td>
                                        <td className="nk-tb-col text-center">
                                            <span>{item.config.name}</span>
                                        </td>
                                        <td className="nk-tb-col text-center h4">
                                            {(() => {
                                                switch (item.config.os) {
                                                    case 'win':
                                                        return (
                                                            <em className="icon ni ni-windows"></em>
                                                        )
                                                        break
                                                    case 'mac':
                                                        return (
                                                            <em className="icon ni ni-apple"></em>
                                                        )
                                                        break
                                                    case 'lin':
                                                        return (
                                                            <em className="icon ni ni-linux"></em>
                                                        )
                                                        break
                                                    default:
                                                        return (
                                                            <span>unknow</span>
                                                        )
                                                }
                                            })()}
                                        </td>
                                        <td className="nk-tb-col text-center">
                                            <span>{item.config.version}</span>
                                        </td>
                                        <td className="nk-tb-col text-center">
                                            {/* <span>{browserController[item.uuid] !== undefined ? browserController[item.uuid].text : "Ready"}</span> */}
                                            <span>{item.time_remaining}</span>
                                        </td>
                                        <td className="nk-tb-col nk-tb-col-tools text-center">
                                            <ul className="nk-tb-actions gx-1 justify-content-center">
                                                <li>
                                                    <div className="dropdown">
                                                        <a href="#"
                                                            onClick={(e) => e.preventDefault()}
                                                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                                            data-bs-toggle="dropdown"><em
                                                                className="icon ni ni-more-v"></em></a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-end">
                                                            <ul className="link-list-opt no-bdr">
                                                                <li>
                                                                    <a href="#" data-id={item.uuid} onClick={handleRestore}><span>Restore</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
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
    )
        ;
})

const mapStateToProps = (state, props) => ({
    browserController: state.browserController,
});
const mapDispatch = { AddBrowser, RemoveBrowser };
export default connect(mapStateToProps, mapDispatch, null, { forwardRef: true })(Table);