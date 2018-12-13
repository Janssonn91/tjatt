const fs = require('fs');
const path = require('path');
const del = require('del');
const { exec } = require('child_process');
const routing = require('../../../reverse-proxy/routing.json');

module.exports = class handleGit {

static async addReverseProxy(payload) {
    console.log('adding reverse proxy');
    routing[`${payload.uniqueProjectName}.tjatt.net`] = payload.dockerPort;
    let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");

    await fs.writeFile(pathToRouting, routingJSON, err => {
      if (err) throw err;
    });

    exec(`pm2 start sub-domain.js --name ${payload.uniqueProjectName}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on adding reverse the proxy');
                return;
            } else{
                stopReverseProxy(payload);
            }
        }
    );
}

// this is not done!!!!!!!
static async removeReverseProxy(payload) {
    console.log('remove reverse-proxy', payload.name);
    // routing[`${payload.uniqueProjectName}.tjatt.net`] = `${payload.dockerPort}`;
    // let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
    console.log(pathToReverse);

    // await fs.writeFile(pathToRouting, routingJSON, err => {
    //   if (err) throw err;
    // });
    exec(`pm2 delete ${payload.name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on reversing the proxy');
                return;
            }
        }
    );
}

static async startReverseProxy(payload) {
    console.log('starting reverse proxy');
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
    exec(`pm2 start ${payload.uniqueProjectName}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on start reverse the proxy');
                return;
            }
        }
    );
}

static async stopReverseProxy(payload) {
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
    exec(`pm2 stop ${payload.name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on reversing the proxy');
                return;
            }
        }
    );
}

}