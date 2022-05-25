import React, {useEffect, useState, memo} from "react";
import {SHARE_PROFILE_TABLE, BASE_URL_V1, SHARE, UNSHARE} from "../../constants/api";
import axios from "axios";
import ReactPaginate from "react-paginate";
import MultiToast from "../../components/defaultToast";
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import "../../assets/css/form/validate.css";
import * as ValidateResponse from "../../constants/ValidateResponse";

function ModalShare({isShowing, modalName, data, hide, reloadMainTable}) {
    const [items, setItems] = useState([]);
    let nameModal = 'shareProfile';

    const getDefault = async () => {
        axios.get(BASE_URL_V1 + SHARE_PROFILE_TABLE + `/${data.id}`).then(res => {
            const data = res.data;
            const total = data.meta.total;
            setItems(data.content);
        }).catch(error => {
                MultiToast.defaultToast(error)
            }
        )
    };
    useEffect(() => {
        if (isShowing && modalName.includes(nameModal))
            getDefault();
    }, [isShowing]);

    /* Validate form */
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: {errors}
    } = useForm();

    const shareProfile = async (params) => {
        params["browser_uuid"] = data.id;
        axios.post(BASE_URL_V1 + SHARE, params).then(res => {
            MultiToast.defaultToast(res)
            getDefault()
        }).catch(error => {
                MultiToast.defaultToast(error)
            }
        )
        reset();
        setFocus('recepient');
    }

    const onUnshare = async (shared_uuid) => {
        axios.delete(BASE_URL_V1 + UNSHARE, {
            data: {
                share_uuid: shared_uuid
            }
        }).then(res => {
            MultiToast.defaultToast(res)
            getDefault()
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
                        <h5 className="modal-title">Share profile</h5>
                    </div>
                    <div className="modal-body">
                        <form className="form-group group-add-center"
                              onSubmit={handleSubmit(shareProfile)}
                        >
                            <label className="form-label pe-2" htmlFor="add_email">Email shared:</label>
                            <div className="form-group d-flex pe-2">
                                <div className="form-group">
                                    <input type="text" className="form-control input-email" id="add_email"
                                           placeholder="example@gmail.com"
                                           {...register("recepient",
                                               {
                                                   required: ValidateResponse.REQUIRED_MESSAGE,
                                                   pattern: {
                                                       value: ValidateResponse.MAIL_ACCEPT_VALUE,
                                                       message: ValidateResponse.MAIL_ACCEPT_MESSAGE,
                                                   },
                                               })
                                           }
                                    />
                                    <ErrorMessage errors={errors} name="recepient" as="p"
                                                  className="validateFail"/>
                                </div>
                                <div className="form-group">
                                    <select className="form-select select-role js-select2" id="role_profile"
                                            defaultValue="admin"
                                            {...register("role",
                                                {
                                                    required: ValidateResponse.REQUIRED_MESSAGE
                                                })
                                            }
                                    >
                                        <option value="admin">admin</option>
                                        <option value="guest">guest</option>
                                    </select>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-outline-primary btn-status" value="Add"/>
                        </form>
                        <div className="card-inner p-0">
                            <table className="table nk-tb-list nk-tb-ulist">
                                <thead className="table-light">
                                <tr className="nk-tb-item nk-tb-head">
                                    <th className="nk-tb-col text-center first-col"><span
                                        className="sub-text">STT</span></th>
                                    <th className="nk-tb-col text-center"><span
                                        className="sub-text">Name</span></th>
                                    <th className="nk-tb-col text-end ps-4"><span
                                        className="sub-text">Role</span></th>
                                    <th className="nk-tb-col text-end pe-5"> <span
                                        className="sub-text">Action</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {(items.length > 0) ? (items.map((item, index) => {
                                    return (
                                        <tr key={item.email} className="nk-tb-item">
                                            <td className="nk-tb-col first-col">
                                                <span>{(index + 1)}</span>
                                            </td>
                                            <td className="nk-tb-col">
                                                <span>{item.email}</span>
                                            </td>
                                            <td className="nk-tb-col text-end">
                                                <span>{item.role}</span>
                                            </td>
                                            <td className="nk-tb-col text-end">
                                                <a href="#"
                                                   className="btn btn-sm btn-danger"
                                                   onClick={() => onUnshare(item.shared_uuid)}
                                                >Unshare</a>
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
                        {/*<div className="card-inner">*/}
                        {/*    <div className="nk-block-between-md g-3 paginate-box">*/}
                        {/*        <div className="g">*/}
                        {/*            <ReactPaginate*/}
                        {/*                previousLabel={"Prev"}*/}
                        {/*                nextLabel={"next"}*/}
                        {/*                breakLabel={'<em className=\"icon ni ni-more-h\"></em></span>'}*/}
                        {/*                pageCount={pageCount}*/}
                        {/*                marginPagesDisplayed={2}*/}
                        {/*                pageRangeDisplayed={2}*/}
                        {/*                onPageChange={handlePageClick}*/}
                        {/*                containerClassName={"pagination justify-content-center justify-content-md-start"}*/}
                        {/*                pageClassName={"page-item"}*/}
                        {/*                pageLinkClassName={"page-link"}*/}
                        {/*                previousClassName={"page-item"}*/}
                        {/*                previousLinkClassName={"page-link"}*/}
                        {/*                nextClassName={"page-item"}*/}
                        {/*                nextLinkClassName={"page-link"}*/}
                        {/*                breakClassName={"page-item"}*/}
                        {/*                breakLinkClassName={"page-link"}*/}
                        {/*                activeClassName={"active"}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalShare);