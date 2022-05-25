import ReactPaginate from "react-paginate";
import {useEffect, useState, useContext, forwardRef, useImperativeHandle} from "react";
import React from "react";
import axios from "axios";
import {SelectProxyContext} from './select-context';
import {BASE_URL_V1, PROXY, PROXY_TABLE} from "../../constants/api";
import MultiToast from "../../components/defaultToast";
import Filter from "./filter";

function Table({getTotal, openModal}, ref) {
    //select all checkbox
    const selectContext = useContext(SelectProxyContext);

    // get table's data
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState({type:'', country:''});
    const getDefault = async () => {
        axios.get(BASE_URL_V1 + PROXY_TABLE + `?page=${currentPage}&limit=${limit}`).then(res => {
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
    }, [currentPage, limit]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        // scroll to the top
        //window.scrollTo(0, 0)
    };

    //send func to parent component
    useImperativeHandle(ref, () => ({
        reloadTable() {
            getDefault();
        },
    }));

    // delete proxy
    const deleteProxy = async (uuid) => {
        await axios({
            url: BASE_URL_V1 + PROXY + `/${uuid}`,
            method: 'delete'
        }).then(res => {
            getDefault();
            MultiToast.defaultToast(res);
        }).catch(error => {
                MultiToast.defaultToast(error);
            }
        );
    }

    return (
        <div className="card card-bordered card-stretch">
            <div className="card-inner-group">
                <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
                        <div className="card-tools">
                        </div>
                        <div className="card-tools me-n1">
                            <ul className="btn-toolbar gx-1">
                                <li>
                                    <a href="#" className="btn btn-icon search-toggle toggle-search"
                                       onClick={e => e.preventDefault()}
                                       data-target="search"><em
                                        className="icon ni ni-search"></em></a>
                                </li>
                                <li className="btn-toolbar-sep"></li>
                                <li>
                                    <Filter
                                        limit={limit}
                                        handleShow={setLimit}
                                    />
                                </li>
                            </ul>
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
                                       placeholder="Search by name"/>
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
                            <th className="nk-tb-col"><span className="sub-text ms-5">Type</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">IP</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">Port</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">Username</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">Password</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">Country</span></th>
                            <th className="nk-tb-col text-center"><span
                                className="sub-text">Profile</span></th>
                            <th className="nk-tb-col text-center pe-0"><span
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
                                                   data-data={JSON.stringify(item)}
                                                   onChange={selectContext.handleClick}
                                                   checked={selectContext.isCheck.includes(item.uuid)}
                                            />
                                            <label className="custom-control-label"
                                                   htmlFor={item.uuid}></label>
                                        </div>
                                    </td>
                                    <td className="nk-tb-col text-center">
                                        <span>{item.type}</span>
                                    </td>
                                    <td className="nk-tb-col text-center td-min-lg ">
                                        <span>{item.ip} {selectContext.isLive[item.uuid]?(selectContext.isLive[item.uuid] == 1 ?<i className="text-success las la-check"></i>:<i className="text-danger las la-times"></i>):""}
                                        </span>
                                    </td>
                                    <td className="nk-tb-col text-center">
                                        <span>{item.port}</span>
                                    </td>
                                    <td className="nk-tb-col text-center td-length-md">
                                        <span>{item.user}</span>
                                    </td>
                                    <td className="nk-tb-col text-center">
                                        <span>{item.pass}</span>
                                    </td>
                                    <td className="nk-tb-col text-center">
                                        <span>{item.country}</span>
                                    </td>
                                    <td className="nk-tb-col text-center">
                                        <span>{item.browsers_count}</span>
                                    </td>
                                    <td className="nk-tb-col">
                                        <ul className="nk-tb-actions gx-1">
                                            <li>
                                                <a href="#"
                                                   className="btn btn-sm btn-primary"
                                                   onClick={e => {
                                                       e.preventDefault()
                                                       selectContext.checkProxy([item])
                                                   }}
                                                >Check</a>
                                            </li>
                                            <li>
                                                <div className="dropdown">
                                                    <a href="#"
                                                       onClick={e => e.preventDefault()}
                                                       className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                                       data-bs-toggle="dropdown"><em
                                                        className="icon ni ni-more-v"></em></a>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end">
                                                        <ul className="link-list-opt no-bdr">
                                                            <li>
                                                                <a href="#"
                                                                   onClick={e => {
                                                                       e.preventDefault();
                                                                       openModal(true, 'addProxy', item);
                                                                   }}
                                                                ><span>Edit</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#"
                                                                   onClick={e => {
                                                                       e.preventDefault();
                                                                       deleteProxy(item.uuid);
                                                                   }}
                                                                ><span>Delete</span></a>
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