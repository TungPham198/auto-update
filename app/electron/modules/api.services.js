const axios = require('axios').default;
const FormData = require('form-data');
const configs = require('./configs');
const path = require('path');
const https = require('https');
const fs = require("fs");
const unzipper = require("unzipper");

/* Pathname List*/
const BROWSER_INFO = '/browser/';
const BROWSER_UPDATE = '/browser/update/';
const BROWSER_CLOSE = '/browser/close/';
const BROWSER_PING = '/browser/ping/';
const decompress = require('decompress')
const decompressUnzip = require('decompress-unzip');
module.exports = {
    GetBrowserInfo: (uuid) => {
        // return await axios.get(configs.base_url_v1 + BROWSER_INFO + uuid);
        return axios.get(configs.base_url_v1 + BROWSER_INFO + uuid + "?run=true");
    },
    CloseBrowser: async (uuid) => {
        return await axios.post(configs.base_url_v1 + BROWSER_CLOSE + uuid);
    },
    PingBrowser: (uuid_list) => {
        return axios({
            method: 'post',
            url: configs.base_url_v1 + BROWSER_PING,
            data: {
                "browser_uuid": uuid_list
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `application/json;`,
            },
        });
    },
    GetPreferencesFile: async (uuid) => {
        return axios({
            method: 'get',
            url: configs.base_url_v1 + BROWSER_INFO + uuid + "/preferences",
            responseType: 'stream'
        })
    },
    /**
     *
     * @param _url Download url string
     * @param _path Path to save file
     * @param _unzip Extract file to _path
     * @param _process_callback Call in Event on.data of http request example_function(downloaded_chunk, file_lenth)
     * @param _end_callback Call when download successfully
     */
    DownloadPubFile: (_url, _path, _unzip = true, _process_callback = null, _end_callback = null, _text_title="") => {
        // https.get(_url, function (response) {
        //     if (response.statusCode === 200) {
        //         let len = parseInt(response.headers['content-length'], 10);
        //         const _file = !_unzip ? fs.createWriteStream(_path) : null;
        //         response.on('data', function (chunk) {
        //             if (!_unzip) {
        //                 _file.write(chunk);
        //             }
        //             if (_process_callback)
        //                 _process_callback(chunk.length, len,_text_title);
        //             len = 0;
        //         })
        //             .on("end", function () {
        //                 if (!_unzip) _file.close();
        //                 if (_end_callback) _end_callback();
        //             });
        //         if (_unzip) {
        //             response.pipe(unzipper.Extract({path: _path}));
        //         }
        //     } else {
        //         console.log(response.statusMessage)
        //     }
        // });
        axios({
            method: 'get',
            url: _url,
            responseType: 'stream'
        })
            .then(function (response) {
                    if (response.data.statusCode === 200) {
                        let len = parseInt(response.headers['content-length'], 10);
                        const _file = !_unzip ? fs.createWriteStream(_path) : null;
                        response.data.on('data', function (chunk) {
                            if (!_unzip) {
                                _file.write(chunk);
                            }
                            if (_process_callback)
                                _process_callback(chunk.length, len,_text_title);
                            len = 0;
                        })
                            .on("end", function () {
                                if (!_unzip) _file.close();
                                if (_end_callback) _end_callback();
                            });
                        if (_unzip) {
                            response.data.pipe(unzipper.Extract({path: _path}));
                        }
                    } else {
                        console.log("response.statusMessage ",response.data.statusMessage)
                    }


                // if (fs.existsSync(_path)) {
                //     fs.rmSync(_path, {recursive: true, force: true});
                // }
                // fs.mkdirSync(_path);
                // response.data.pipe(fs.createWriteStream(path.join(_path, _filename)))
                //     .on("finish", () => {
                //         if (_unzip) {
                //             decompress(path.join(_path, _filename), _path, {
                //                 plugins: [
                //                     decompressUnzip()
                //                 ]
                //             }).then(() => {
                //                 fs.rmSync(path.join(_path, _filename), {recursive: true, force: true})
                //                 if (_end_callback) _end_callback(true);
                //                 console.log("axios done")
                //             }).catch((err) => {
                //                 console.log("========DownloadFile Error111==========")
                //                 console.log(err)
                //                 if (_end_callback) _end_callback(false);
                //             })
                //         } else {
                //             if (_end_callback) _end_callback(true);
                //         }
                //     });
            })
            .catch((error) => {
                console.log("========DownloadPubFile Error==========")
                console.log(error)
            });
    },
    DownloadFile: (_url, _path, _unzip = true, _end_callback = null) => {
        const _filename = _url.substring(_url.lastIndexOf('/') + 1);
        axios({
            method: 'get',
            url: _url,
            responseType: 'stream'
        })
            .then(function (response) {
                if (fs.existsSync(_path)) {
                    fs.rmSync(_path, {recursive: true, force: true});
                }
                fs.mkdirSync(_path);
                response.data.pipe(fs.createWriteStream(path.join(_path, _filename)))
                    .on("finish", () => {
                        if (_unzip) {
                            decompress(path.join(_path, _filename), _path, {
                                plugins: [
                                    decompressUnzip()
                                ]
                            }).then(() => {
                                fs.rmSync(path.join(_path, _filename), {recursive: true, force: true})
                                if (_end_callback) _end_callback(true);
                                console.log("axios done")
                            }).catch((err) => {
                                console.log("========DownloadFile Error111==========")
                                console.log(err)
                                if (_end_callback) _end_callback(false);
                            })
                        } else {
                            if (_end_callback) _end_callback(true);
                        }
                    });
            })
            .catch((error) => {
                console.log("========DownloadFile Error==========")
                console.log(error)
            });
    },
    UploadZipFile: (_path_file, uuid, config) => {
        const form = new FormData();
        form.append("config", JSON.stringify(config));
        form.append("browser_file", fs.createReadStream(_path_file));
        const response = axios({
            method: 'post',
            url: configs.base_url_v1 + BROWSER_UPDATE + uuid,
            data: form,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': `multipart/form-data;`,
            },
        });
        return response;
    }
}
