const os = require('os');
const path = require("path");
module.exports = {
    api_url: "http://222.252.3.2:3865/",
    tmpdir: os.tmpdir(),
    homedir: path.join(os.homedir(), ".multibrowser"),
    profiles_temp: path.join(os.tmpdir(), ".multibrowser"),
    base_url: "https://dev-api.minhhoangjsc.io/v2",
    base_url_v1: "https://dev-api.minhhoangjsc.io/v1",
    resource_download_path:"/downloads/"
}