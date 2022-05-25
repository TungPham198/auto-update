import React from "react";

const Filter = ({limit, handleShow}) => {
return (
    <div className="toggle-wrap">
        <a href="#" className="btn btn-icon btn-trigger toggle" data-target="cardTools"
           onClick={e => e.preventDefault()}
        ><em
            className="icon ni ni-menu-right"></em></a>
        <div className="toggle-content" data-content="cardTools">
            <ul className="btn-toolbar gx-1">
                <li className="toggle-close">
                    <a href="#" className="btn btn-icon btn-trigger toggle"
                       data-target="cardTools"
                       onClick={e => e.preventDefault()}
                    ><em
                        className="icon ni ni-arrow-left"></em></a>
                </li>
                <li>
                    <div className="dropdown">
                        <a href="#" className="btn btn-trigger btn-icon dropdown-toggle"
                           data-bs-toggle="dropdown"
                           onClick={e => e.preventDefault()}
                        >
                            <em className="icon ni ni-filter-alt"></em>
                        </a>
                        <div
                            className="filter-wg dropdown-menu dropdown-menu-xl dropdown-menu-end">
                            <div className="dropdown-head">
                                                                <span
                                                                    className="sub-title dropdown-title">Filter Users</span>
                                <div className="dropdown">
                                    <a href="#" className="btn btn-sm btn-icon"
                                       onClick={e => e.preventDefault()}
                                    >
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
                                                <option value="HTTP">HTTP</option>
                                                <option value="SOCK5">SOCK5</option>
                                                <option value="SOCK4">SOCK4</option>
                                                <option value="SSH">SSH</option>
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
                           data-bs-toggle="dropdown"
                           onClick={e => e.preventDefault()}
                        >
                            <em className="icon ni ni-setting"></em>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-xs dropdown-menu-end">
                            <ul className="link-check">
                                <li><span>Show</span></li>
                                <li className={(limit == 10)?"active":""}><a href="#" onClick={event => {
                                    event.preventDefault()
                                    handleShow(10)
                                }}>10</a></li>
                                <li className={(limit == 50)?"active":""}><a href="#" onClick={event => {
                                    event.preventDefault()
                                    handleShow(50)
                                }}>50</a></li>
                                <li className={(limit == 100)?"active":""}><a href="#" onClick={event => {
                                    event.preventDefault()
                                    handleShow(100)
                                }}>100</a></li>
                                <li className={(limit == 200)?"active":""}><a href="#" onClick={event => {
                                    event.preventDefault()
                                    handleShow(200)
                                }}>200</a></li>
                                <li className={(limit == 500)?"active":""}><a href="#" onClick={event => {
                                    event.preventDefault()
                                    handleShow(500)
                                }}>500</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);
}

export default Filter;