const socks = require('socksv5');
const { Client } = require('ssh2');
const fp = require("find-free-port")

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    handleForwardSSH: async ( host, port, username, password) => {
        const _p = await fp(16333,19000, '127.0.0.1', 1);
        return new Promise((resolve, reject) => {
            let forwardSocks5 = {
                host: "127.0.0.1",
                port: _p[0]
            }
            const sshConfig = {
                host: host,
                port: port,
                username: username,
                password: password
              };
            socks.createServer((info, accept, deny) => {
                const conn = new Client();
                conn.on('ready', () => {
                  conn.forwardOut(info.srcAddr,
                    info.srcPort,
                    info.dstAddr,
                    info.dstPort,
                                  (err, stream) => {
                    if (err) {
                      conn.end();
                      reject(err)
                      return deny();
                    }
              
                    const clientSocket = accept(true);
                    if (clientSocket) {
                      stream.pipe(clientSocket).pipe(stream).on('close', () => {
                        reject("Close");
                        conn.end();
                      });
                    } else {
                        reject("Error");
                      conn.end();
                    }
                  });
                }).on('error', (err) => {
                  deny();
                  console.log("Tao server socks5 từ ssh error: ",err)
                  reject(err)
                }).connect(sshConfig);
              }).listen(forwardSocks5.port, forwardSocks5.host, () => {
                console.log("Success")
                resolve(forwardSocks5);
              }).useAuth(socks.auth.None());
        });
    }
}