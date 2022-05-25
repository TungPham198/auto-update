import React from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";
import PrivateRoute from "./PrivateRoute";

// Load bundles asynchronously so that the initial render happens faster
const Welcome = loadable(() =>
    import("Pages/profiles/profiles")
);
const Folder = loadable(() =>
    import("Pages/folders/folders")
);
const Proxy = loadable(() =>
    import("Pages/proxies/proxies")
);
const Register = loadable(() =>
    import("Pages/registers/register")
);
const Verify = loadable(() =>
    import("Pages/registers/verify")
);

const Download = loadable(() =>
    import("Pages/Download/download")
);

const Signin = loadable(() =>
    import("Pages/auth/signin")
);

const Create = loadable(() =>
    import("Pages/creates")
);

const Recycle = loadable(() =>
    import("Pages/recycles/index")
);

const EditProfile = loadable(() =>
    import("Pages/creates")
);

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path={ROUTES.WELCOME} component={Welcome}></PrivateRoute>
                <PrivateRoute exact path={ROUTES.FOLDER} component={Folder}></PrivateRoute>
                <PrivateRoute exact path={ROUTES.PROXY} component={Proxy}></PrivateRoute>
                <PrivateRoute exact path={ROUTES.RECYCLE} component={Recycle}></PrivateRoute>
                <PrivateRoute path={ROUTES.CREATE} component={Create}></PrivateRoute>
                <PrivateRoute path={`${ROUTES.EDIT_PROFILE}/:uuid`} component={EditProfile}></PrivateRoute>
                <Route path={ROUTES.SIGNIN} component={Signin}></Route>
                <Route path={ROUTES.REGISTER} component={Register}></Route>
                <Route path={ROUTES.VERIFY} component={Verify}></Route>
                {/*  <Route path={ROUTES.LOGIN} component={Login}></Route> */}
                <Route path={ROUTES.DOWNLOAD} component={Download}></Route>
            </Switch>
        );
    }
}

export default Routes;
