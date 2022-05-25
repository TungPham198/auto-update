import ReactPaginate from "react-paginate";
import React from "react";
import {useEffect, useState, useContext, forwardRef, useImperativeHandle} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {SelectContext} from './select-context';
import {BASE_URL_V1, PROFILE_SHARED_TABLE, PROFILE_TABLE, PROFILE_DUPLICATE} from "../../constants/api";
import MultiToast from "../../components/defaultToast";
import {AddBrowser, RemoveBrowser} from "../../redux/components/browser/browserControllerSlice";

const Table = forwardRef((props, ref) => {
    const getTotal = props.getTotal
    const openModal = props.openModal
    const browserController = props.browserController.list
    // select all checkbox
    const selectContext = useContext(SelectContext);
    // get table's data
    const [type, setType] = useState('owner');
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    //Create state Browsers
    const setBrowserHandle = (uuid, data) => {
        props.AddBrowser({uuid: uuid, data: data})
    }
    /**
     * Browser actions
     */
    useEffect(() => {
        const removeBrowserActionListener = window.api.mb_ipcRenderer.receiveMsg("browser_actions", (data) => {
            switch (data.type) {
                case "notice":
                    setBrowserHandle(data.uuid, {
                        status: "running",
                        run_in_this: false,
                        text: "Running"
                    });
                    MultiToast.fromMainToast(data.content)
                    break
                case "opened":
                    setBrowserHandle(data.uuid, {
                        status: "started",
                        run_in_this: true,
                        text: "Running"
                    });
                    break
                case "syncing":
                    setBrowserHandle(data.uuid, {
                        status: "syncing",
                        run_in_this: true,
                        busy: true,
                        text: "Syncing"
                    });
                    break
                case "closed":
                    setBrowserHandle(data.uuid, {
                        status: "ready",
                        run_in_this: false,
                        text: "Ready"
                    });
                    getDefault(type)
                    break
                case "closing":
                    setBrowserHandle(data.uuid, {
                        status: "closing",
                        run_in_this: true,
                        busy: true,
                        text: "Backup & Syncing"
                    });
                    break
                case "ping":
                    getDefault(type)
                    break
                default:
                    MultiToast.fromMainToast("Browser action is Error!!!")
                    break

            }
        });
        return () => {
            // Anything in here is fired on component unmount.
            if (removeBrowserActionListener) removeBrowserActionListener();
        }
    }, [type])
    const StartBrowser = async (ele, uuid) => {
        const _action = browserController[uuid] && browserController[uuid].run_in_this ? "stop_browser" : "start_browser"
        setBrowserHandle(uuid, {
            status: "starting",
            run_in_this: true,
            text: "Starting",
            busy: true
        });
        window.api.mb_ipcRenderer.sendMsg("browser_actions", {
            "type": _action,
            "uuid": uuid
        });
    }
    let limit = 10;

    //call list table
    const getDefault = async (type = 'owner') => {
        let baseUrl;
        switch (type) {
            case 'owner': {
                baseUrl = BASE_URL_V1 + PROFILE_TABLE;
                break;
            }
            case 'shared': {
                baseUrl = BASE_URL_V1 + PROFILE_SHARED_TABLE;
                break;
            }
        }
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
        getDefault(type);
    }, [type, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
        // scroll to the top
        //window.scrollTo(0, 0)
    };
    const handleType = (data) => {
        setType(data)
    };

    useImperativeHandle(ref, () => ({
        reloadTable() {
            getDefault()
        },
    }));

    const handleClick = (uuid) => {
        axios.get(BASE_URL_V1 + PROFILE_DUPLICATE + uuid)
            .then(res => {
                MultiToast.defaultToast(res)
                getDefault()
                console.log(res);
            }).catch(error => {
            MultiToast.defaultToast(error)
        })
        console.log(uuid);
    }
    return (
        <div className="card card-bordered card-stretch">
            <div className="card-inner-group">
                <div className="card-inner position-relative card-tools-toggle">
                    <div className="card-title-group">
                        <div className="card-tools">
                            <div className="form-inline flex-nowrap gx-3">
                                <a href="#"
                                   className={type == 'owner' ? 'btn btn-primary me-2' : 'btn btn-light me-2'}
                                   onClick={() => handleType('owner')}
                                >
                                    <i className="las la-user"></i>
                                    <span>Your Profiles</span>
                                    {type == 'owner' ? <em className="icon ni ni-chevron-down"></em> :
                                        <em className="icon ni ni-chevron-right"></em>}
                                </a>
                                <a href="#"
                                   className={type == 'shared' ? 'btn btn-primary me-2' : 'btn btn-light me-2'}
                                   onClick={() => handleType('shared')}
                                >
                                    <i className="las la-folder-open"></i>
                                    <span>Shared Profiles</span>
                                    {type == 'shared' ? <em className="icon ni ni-chevron-down"></em> :
                                        <em className="icon ni ni-chevron-right"></em>}
                                </a>
                            </div>
                        </div>
                        <div className="card-tools me-n1">
                            <ul className="btn-toolbar gx-1">
                                <li>
                                    <a href="#" className="btn btn-icon search-toggle toggle-search"
                                       data-target="search"><em
                                        className="icon ni ni-search"></em></a>
                                </li>
                                <li className="btn-toolbar-sep"></li>
                                <li>
                                    <div className="toggle-wrap">
                                        <a href="#" className="btn btn-icon btn-trigger toggle" data-target="cardTools"><em
                                            className="icon ni ni-menu-right"></em></a>
                                        <div className="toggle-content" data-content="cardTools">
                                            <ul className="btn-toolbar gx-1">
                                                <li className="toggle-close">
                                                    <a href="#" className="btn btn-icon btn-trigger toggle"
                                                       data-target="cardTools"><em
                                                        className="icon ni ni-arrow-left"></em></a>
                                                </li>
                                                <li>
                                                    <div className="dropdown">
                                                        <a href="#" className="btn btn-trigger btn-icon dropdown-toggle"
                                                           data-bs-toggle="dropdown">
                                                            <em className="icon ni ni-filter-alt"></em>
                                                        </a>
                                                        <div
                                                            className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-end">
                                                            <div className="dropdown-head">
                                                                <span
                                                                    className="sub-title dropdown-title">Filter Users</span>
                                                                <div className="dropdown">
                                                                    <a href="#" className="btn btn-sm btn-icon">
                                                                        <em className="icon ni ni-more-h"></em>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="dropdown-body dropdown-body-rg">
                                                                <div className="row gx-6 gy-3">
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label
                                                                                className="overline-title overline-title-alt">Type</label>
                                                                            <select className="form-select js-select2">
                                                                                <option value="any">Any Type</option>
                                                                                <option value="mac">Mac</option>
                                                                                <option value="win">Window</option>
                                                                                <option value="lin">Linux</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label
                                                                                className="overline-title overline-title-alt">Browser</label>
                                                                            <select className="form-select js-select2">
                                                                                <option value="any">Any Browser</option>
                                                                                <option value="orbita">Orbita</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label
                                                                                className="overline-title overline-title-alt">Version</label>
                                                                            <select className="form-select js-select2">
                                                                                <option value="any">Any Version</option>
                                                                                <option value="99">99</option>
                                                                                <option value="99">98</option>
                                                                                <option value="99">97</option>
                                                                                <option value="99">96</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <button type="button"
                                                                                    className="btn btn-secondary me-2">Filter
                                                                            </button>
                                                                            <button type="button"
                                                                                    className="btn btn-light">Reset
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="dropdown">
                                                        <a href="#" className="btn btn-trigger btn-icon dropdown-toggle"
                                                           data-bs-toggle="dropdown">
                                                            <em className="icon ni ni-setting"></em>
                                                        </a>
                                                        <div
                                                            className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                                                            <ul className="link-check">
                                                                <li><span>Show</span></li>
                                                                <li className="active"><a href="#">10</a></li>
                                                                <li><a href="#">20</a></li>
                                                                <li><a href="#">50</a></li>
                                                            </ul>
                                                            <ul className="link-check">
                                                                <li><span>Order</span></li>
                                                                <li className="active"><a href="#">DESC</a></li>
                                                                <li><a href="#">ASC</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-search search-wrap" data-search="search">
                        <div className="card-body">
                            <div className="search-content">
                                <a href="#" className="search-back btn btn-icon toggle-search" data-target="search"><em
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
                                className="sub-text">Status</span></th>
                            <th className="nk-tb-col text-center">
                                                                    <span
                                                                        className="sub-text">Action</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {(items.length > 0) ? (items.map((item,index) => {
                            let start_stop_text = "Start"
                            let btn_type = "primary"
                            let btn_disabled = ""
                            let _status_text = "Ready"
                            if (!item.can_be_running || (browserController[item.uuid] ? browserController[item.uuid].status !== "ready" : false)) {
                                start_stop_text = "Stop"
                                btn_type = "warning"
                            }
                            if ((!item.can_be_running && !(browserController[item.uuid] ? browserController[item.uuid].run_in_this : false)) || (browserController[item.uuid] && browserController[item.uuid].busy)) {
                                btn_disabled = " disabled"
                            }
                            if (!item.can_be_running && !(browserController[item.uuid]? browserController[item.uuid].run_in_this:false)) {
                                _status_text = "Other Device Running"
                            } else {
                                _status_text = browserController[item.uuid] !== undefined ? browserController[item.uuid].text : "Ready";
                            }
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
                                        <span>{_status_text}</span>
                                    </td>
                                    <td className="nk-tb-col nk-tb-col-tools text-center">
                                        <ul className="nk-tb-actions gx-1">
                                            <li>
                                                <a href="#" data-key={item.uuid}
                                                   className={"btn btn-sm btn-" + btn_type + " btn-status" + btn_disabled}
                                                   onClick={(e) => {
                                                       e.preventDefault();
                                                       StartBrowser(e, item.uuid)
                                                   }}>{start_stop_text}</a>
                                            </li>
                                            <li>
                                                <div className="dropdown">
                                                    <a href="#"
                                                       className="dropdown-toggle btn btn-sm btn-icon btn-trigger"
                                                       data-bs-toggle="dropdown"><em
                                                        className="icon ni ni-more-v"></em></a>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end">
                                                        <ul className="link-list-opt no-bdr">
                                                            <li>
                                                                <a href="#" onClick={
                                                                    (e) => {
                                                                        e.preventDefault()
                                                                        handleClick(item.uuid)
                                                                    }
                                                                }><span>Duplicate</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#" onClick={
                                                                    (e) => {
                                                                        e.preventDefault()
                                                                        openModal(true, 'shareProfile', {id: item.uuid})
                                                                    }
                                                                }
                                                                ><span>Share</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#" onClick={
                                                                    (e) => {
                                                                        e.preventDefault()
                                                                        openModal(true, 'addToFolder', {
                                                                            id: [item.uuid],
                                                                            folder_id: item.folder_id
                                                                        })
                                                                    }
                                                                }><span>Add to folder</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#"><span>Edit</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#"><span>Delete</span></a>
                                                            </li>
                                                            <hr/>
                                                            <li>
                                                                <a href="#"><span>Export</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#"><span>Proxy</span></a>
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
    )
        ;
})

const mapStateToProps = (state, props) => ({
    browserController: state.browserController,
});
const mapDispatch = {AddBrowser, RemoveBrowser};
export default connect(mapStateToProps, mapDispatch, null, {forwardRef: true})(Table);