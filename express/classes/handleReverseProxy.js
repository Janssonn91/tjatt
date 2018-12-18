const fs = require('fs');
const path = require('path');
const del = require('del');
const { exec } = require('child_process');
const routing = require('../../../reverse-proxy/routing.json');

module.exports = class handleReverseProxy {

static async addReverseProxy(payload) {
    console.log('adding reverse proxy', payload.uniqueProjectName, payload.dockerPort);
    routing[`${payload.uniqueProjectName}.tjatt.net`] = payload.dockerPort;
    let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");

    await fs.writeFile(pathToRouting, routingJSON, err => {
      if (err) throw err;
    });
    this.restartReverseProxy();
}

// this is not done!!!!!!!
static async removeReverseProxy(name, port) {
    console.log('remove reverse-proxy', name);
    // routing[`${payload.uniqueProjectName}.tjatt.net`] = `${payload.dockerPort}`;
    // let routingJSON = JSON.stringify(routing, null, 2);
    
    const pathToRouting = path.join(__dirname, "../../../reverse-proxy/routing.json");
    const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");

}

static async restartReverseProxy(){
   const pathToReverse = path.join(__dirname, "../../../reverse-proxy/");
   exec(`pm2 restart reverse-proxy`, {
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