import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import Routes from "Core/routes";
import Nav from "./nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router";


class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <React.Fragment>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ToastContainer />
            <Nav history={history}></Nav>
            <Routes></Routes>
         
          </ConnectedRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

export default Root;
