import React from "react";
import {connect} from "react-redux";
import {DownloadSuccessfully} from "../../redux/components/resource/resource";

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {download_process: 0,download_title:"Prepare downloading"};
    }
    componentDidMount() {
        if (this.props.checker.orbita && this.props.checker.default_profile) {
            this.props.history.push("/");
        }
        window.api.mb_ipcRenderer.sendMsg('mb_download', {
            action: 'orbita',
            browser: this.props.checker.orbita,
            default_profile: this.props.checker.default_profile,
            df_file_name: this.props.checker.default_profile_name
        });
        window.api.mb_ipcRenderer.receiveMsg("mb_download_res", (data) => {
            if (data.status === "downloading") {
                this.setState({
                    download_process: data.percent,
                    download_title:data.text
                })
            }
            if (data.status === "successfully") {
                this.props.DownloadSuccessfully();
                console.log(this.props.checker);
                this.props.history.push("/");
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="nk-app-root">
                    <div className="nk-main ">
                        <div className="nk-wrap nk-wrap-nosidebar">
                            <div className="nk-content ">
                                <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                                    <div className="brand-logo pb-4 text-center">
                                        <a href="#" className="logo-link">
                                            <h3>MultiBrowser</h3>
                                        </a>
                                    </div>
                                    <div className="card card-bordered">
                                        <div className="card-inner card-inner-lg">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h4 className="nk-block-title">{this.state.download_title}</h4>
                                                    <div className="nk-block-des">
                                                    </div>
                                                    <div className="pgrb">
                                                        <div className="pgrb-container">
                                                            <div className="pgrb-progressbar-container">
                                                                <div className="pgrb-progressbar-complete"
                                                                     style={{width: `${this.state.download_process}%`}}>
                                                                    <div className="pgrb-progressbar-liquid"></div>
                                                                </div>
                                                                <span className="pgrb-progress">{this.state.download_process}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) => ({
    checker: state.resource,
});
const mapDispatch = {DownloadSuccessfully};

export default connect(mapStateToProps, mapDispatch)(Download);
