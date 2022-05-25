import {useEffect, useState} from "react";
import React, {useContext} from "react";
import axios from "axios";
import {selectFolderContext} from './select-context';

function Option(props) {

  const context = useContext(selectFolderContext);
  return (
    context.isCheck.length > 0 &&
    <div className="card card-bordered card-preview">
      <div className="card-inner row">
        <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i className="las la-copy"></i> Clone</a>
        <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i className="las la-file-download"></i> Export</a>
        <a href="#" className="btn btn-outline-danger mx-2 my-1 col-md-2" onClick={e=>{
            e.preventDefault();
            props.handleDelete(context.isCheck);
        }}><i className="las la-trash-alt"></i> Delete</a>
      </div>
    </div>
  );
}

export default Option;