const axios = require('axios').default;
const { SocksProxyAgent } = require('socks-proxy-agent')
const { HTTPAgent, HTTPSAgent } = require('ssh2');
const HttpsProxyAgent = require('https-proxy-agent');

const convertSelectToUrl = (selector) => {
    if(selector == "api.ip.sb") return {
        referer: "https://api.ip.sb",
        url: "https://api.ip.sb/geoip"
    }
    if(selector == "Ipinfo.io") return {
        referer: "https://ipinfo.io/",
        url: "https://ipinfo.io/widget"
    }
    if(selector == "Ipgeolocation.io") return {
        referer: "https://api.ipgeolocation.io",
        url: "https://api.ipgeolocation.io/ipgeo?include=hostname"
    }
    if(selector == "Browserleaks.com") return {
        referer: "https://browserleaks.com/",
        url: "https://browserleaks.com/ip"
    }
}
const formatDataFromResponsive = (selector, data) => {
    const ProxyInfo = {
        ip: "45.58.61.166",
        loc: "32.8152,-96.8703",
        org: "AS201106 Spartan Host Ltd",
        city: "Dallas",
        postal: "75247",
        region: "Texas",
        country: "US",
        hostname: "kmdczy.ml",
        timezone: "America/Chicago",
    }
    let responseJson = JSON.parse(data);
    if(selector == "api.ip.sb")  {
        ProxyInfo.ip = responseJson["ip"];
        ProxyInfo.loc = responseJson["latitude"]+","+responseJson["longitude"];
        ProxyInfo.org = responseJson["organization"];
        ProxyInfo.city = responseJson["city"];
        ProxyInfo.postal = "";
        ProxyInfo.region = responseJson["region"];
        ProxyInfo.country = responseJson["country_code"];
        ProxyInfo.hostname = "";
        ProxyInfo.timezone = responseJson["timezone"];
    }
    if(selector == "Ipinfo.io")  {
        ProxyInfo.ip = responseJson["ip"];
        ProxyInfo.loc = responseJson["loc"];
        ProxyInfo.org = responseJson["org"];
        ProxyInfo.city = responseJson["city"];
        ProxyInfo.postal = responseJson["postal"];
        ProxyInfo.region = responseJson["region"];
        ProxyInfo.country = responseJson["country"];
        ProxyInfo.hostname = responseJson["hostname"];
        ProxyInfo.timezone = responseJson["timezone"];
    }
    if(selector == "Ipgeolocation.io")  {
        ProxyInfo.ip = responseJson["ip"];
        ProxyInfo.loc = responseJson["latitude"]+","+responseJson["longitude"];
        ProxyInfo.org = responseJson["organization"];
        ProxyInfo.city = responseJson["city"];
        ProxyInfo.postal = "";
        ProxyInfo.region = responseJson["region"];
        ProxyInfo.country = responseJson["country_code"];
        ProxyInfo.hostname = "";
        ProxyInfo.timezone = responseJson["timezone"];
    }
    if(selector == "Browserleaks.com")  {
        ProxyInfo.ip = responseJson["ip"];
        ProxyInfo.loc = responseJson["latitude"]+","+responseJson["longitude"];
        ProxyInfo.org = responseJson["organization"];
        ProxyInfo.city = responseJson["city"];
        ProxyInfo.postal = "";
        ProxyInfo.region = responseJson["region"];
        ProxyInfo.country = responseJson["country_code"];
        ProxyInfo.hostname = "";
        ProxyInfo.timezone = responseJson["timezone"];
    }

    return ProxyInfo;
}
const SshProxy = (typecheck ,host, port, username, password) => {
    return new Promise((resolve, reject) => {
        const sshConfig = {
            host: host,
            port: port,
            username: username,
            password: password
        };
        const agentHttp = new HTTPAgent(sshConfig);
        const agentHttps = new HTTPSAgent(sshConfig);
        AxiosAgent(typecheck,agentHttp, agentHttps).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        })


    });
}
const Socks5Proxy = (typecheck ,host, port, username, password) => {
    return new Promise((resolve, reject) => {
        if (username == undefined) {
            const infoProxy = {
                hostname: host,
                port: port
            }
            const agent = new SocksProxyAgent(infoProxy);
            AxiosAgent(agent, agent).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        } else {
            const infoProxy = {
                hostname: host,
                port: port,
                userId: username,
                password: password
            }
            const agent = new SocksProxyAgent(infoProxy);
            AxiosAgent(typecheck,agent, agent).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        }


    });
}
const Socks4Proxy = (typecheck ,host, port, username, password) => {
    return new Promise((resolve, reject) => {
        if (username == undefined) {
            const infoProxy = {
                hostname: host,
                port: port
            }
            const agent = new SocksProxyAgent(infoProxy);
            AxiosAgent(agent, agent).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        } else {
            const infoProxy = {
                hostname: host,
                port: port,
                userId: username,
                password: password
            }
            const agent = new SocksProxyAgent(infoProxy);
            AxiosAgent(typecheck,agent, agent).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        }
        // const infoProxy ={
        //     hostname: host,
        //     port: port,
        //     userId: username,
        //     password: password
        // }
        // const agent = new SocksProxyAgent(infoProxy);
        // AxiosAgent(agent,agent).then((response) => {
        //     resolve(response);
        // }).catch((error) => {
        //     reject(error);
        // })

    });
}
const HttpProxy = (typecheck ,host, port, username, password) => {
    return new Promise((resolve, reject) => {
        const proxyAgent = new HttpsProxyAgent(`http://${username}:${password}@${host}:${port}`);
        // const proxy ={
        //     protocol: protocol,
        //     host: host,
        //     port: port,
        //     auth: username == undefined ? undefined : 
        //     {
        //         username: username,
        //         password: password
        //     }
        // }
        AxiosHttpAgent(typecheck,proxyAgent).then((response) => {
            resolve(response);
        }).catch((error) => {
            console.log(JSON.stringify(error));
            reject(error.status);
        })

    });
}
const AxiosAgent = (typecheck, agentHttp, agentHttps) => {

    return axios(convertSelectToUrl(typecheck).url,
        {
            method: "get",
            headers: {
                "Referer": convertSelectToUrl(typecheck).referer,
                "Accept-Language": "en-US,en;q=0.5",
                "Access-Control-Allow-Origin": "*"
            },
            httpAgent: agentHttp,
            httpsAgent: agentHttps,
            responseType: 'json',
        });
}
const AxiosHttpAgent = (typecheck,proxy) => {
    return axios(convertSelectToUrl(typecheck).url,
        {
            method: "get",
            headers: {
                "Referer": convertSelectToUrl(typecheck).referer,
                "Accept-Language": "en-US,en;q=0.5",
                "Access-Control-Allow-Origin": "*"
            },
            httpsAgent: proxy,
            responseType: 'json',
        });
}

module.exports = {
    handleCheckproxy: (urlcheck,typeProxy, host, port, username, password) => {
        return new Promise((resolve, reject) => {
            if (typeProxy == "SSH") {
                
                SshProxy(urlcheck,host, port, username, password).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    console.log(err)
                    reject(err);
                })
            }
            if (typeProxy == "SOCK5") {
                Socks5Proxy(urlcheck,host, port, username, password).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }

            if (typeProxy == "SOCK4") {
                Socks4Proxy(urlcheck,host, port, username, password).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }
            if (typeProxy == "HTTP") {
                HttpProxy(urlcheck,host, port, username, password).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }
            if (typeProxy == "HTTPS") {
                HttpProxy(urlcheck,host, port, username, password).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })
            }
        });
    },
}
