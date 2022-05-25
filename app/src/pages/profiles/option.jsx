import {useEffect, useState} from "react";
import React, {useContext} from "react";
import axios from "axios";
import {SelectContext} from './select-context';

function Option({openModal}) {

    const context = useContext(SelectContext);
    return (
        context.isCheck.length > 0 &&
        <div className="card card-bordered card-preview">
            <div className="card-inner row">
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"
                   onClick={
                       (e) => {
                           e.preventDefault()
                           openModal(true, 'addToFolder', {
                               id: context.isCheck
                           })
                       }
                   }
                ><i className="las la-folder-plus"></i> Add to Folder</a>
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i className="las la-copy"></i> Clone</a>
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i
                    className="las la-fingerprint"></i> New Fingerprint</a>
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i
                    className="las la-file-download"></i> Export</a>
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i
                    className="las la-file-download"></i> Proxy</a>
                <a href="#" className="btn btn-outline-danger mx-2 my-1 col-md-2"><i
                    className="las la-trash-alt"></i> Delete</a>
                <a href="#" className="btn btn-outline-primary mx-2 my-1 col-md-2"><i
                    className="las la-play-circle"></i> Run profiles</a>
                <a href="#" className="btn btn-outline-danger mx-2 my-1 col-md-2"><i
                    className="las la-pause-circle"></i> Stop profiles</a>
            </div>
        </div>
    );
}

export default Option;