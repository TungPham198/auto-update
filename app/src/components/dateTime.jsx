import React from "react";

const formatDate = (date) => {
    const format = new Date(date);
    const dd = String(format.getDate()).padStart(2, '0');
    const mm = String(format.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = format.getFullYear();

    return mm + '-' + dd + '-' + yyyy;
}

export default {formatDate}