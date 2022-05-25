import React, {useContext} from "react";
import {SelectProxyContext} from './select-context';
import axios from "axios";
import MultiToast from "../../components/defaultToast";
import {BASE_URL_V1, DELETE_MULTIPLE_PROXY} from "../../constants/api";

function Option({reloadMainTable}) {

    const context = useContext(SelectProxyContext);
    
    const deleteMutiple = async () => {
      await axios({
          url: BASE_URL_V1 + DELETE_MULTIPLE_PROXY,
          method: 'delete',
          data: {
              proxy_uuid: context.isCheck
          }
      }).then(res => {
          reloadMainTable();
          MultiToast.defaultToast(res);
      }).catch(error => {
              MultiToast.defaultToast(error);
          }
      );
    }
    return (
        context.isCheck.length > 0 &&
        <div className="card card-bordered card-preview">
            <div className="card-inner">
                <a href="#" className="btn btn-sm btn-outline-danger mx-1"
                   onClick={(e) => {
                       e.preventDefault();
                       deleteMutiple();
                   }}
                ><i className="las la-trash-alt"></i> Delete</a>
                <a href="#" className="btn btn-sm btn-outline-info mx-1"
                   onClick={e => {
                       e.preventDefault()
                       context.checkProxy(context.isData)
                   }}
                ><i className="las la-check"></i> Check live</a>
            </div>
        </div>
    );
}

export default Option;