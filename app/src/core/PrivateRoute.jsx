import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";

const PrivateRoute = props => {
    if (!props.user.isAuthUser) {
        return <Redirect to="/signin" />;
    } else {
        return <Route {...props} />;
    }
};

const mapStateToProps = (state, props) => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
