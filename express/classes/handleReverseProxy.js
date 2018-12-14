const fs = require('fs');
const path = require('path');
const del = require('del');
const { exec } = require('child_process');
const routing = require('../../../reverse-proxy/routing.json');

module.exports = class handleGit {

static async addReverseProxy(name, port) {
    console.log('adding reverse proxy', name);
    routing[`${name}.tjatt.net`] = port;
    let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");

    await fs.writeFile(pathToRouting, routingJSON, err => {
      if (err) throw err;
    });

    await exec(`pm2 start sub-domain.js --name ${name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on adding reverse the proxy');
                return;
            }
        }
    );
    // exec(`pm2 stop ${name}`, {
    //     cwd: pathToReverse
    //     }, (err, stdout, stderr) => {
    //         if (err) {
    //             console.log(err, 'something when wrong on reversing the proxy');
    //             return;
    //         }
    //     }
    // );
}

// this is not done!!!!!!!
static async removeReverseProxy(name, port) {
    console.log('remove reverse-proxy', name);
    // routing[`${payload.uniqueProjectName}.tjatt.net`] = `${payload.dockerPort}`;
    // let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");

    // await fs.writeFile(pathToRouting, routingJSON, err => {
    //   if (err) throw err;
    // });
    exec(`pm2 delete ${name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on reversing the proxy');
                return;
            }
        }
    );
}

static async startReverseProxy(name) {
    console.log('starting reverse proxy', name);
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
    exec(`pm2 start ${name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on start reverse the proxy');
                return;
            }
        }
    );
}

static async stopReverseProxy(name) {
    console.log('stop reverse proxy', name);
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
    exec(`pm2 stop ${name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on reversing the proxy');
                return;
            }
        }
    );
}

// static async restartReverseProxy(){
//    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
//    exec(`pm2 stop reverse-proxy`, {
//     cwd: pathToReverse
//     }, (err, stdout, stderr) => {
//         if (err) {
//             console.log(err, 'something when wrong on reversing the proxy');
//             return;
//             }
//         }
//    );
// }

}