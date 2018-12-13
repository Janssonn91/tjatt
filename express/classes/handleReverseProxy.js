const fs = require('fs');
const path = require('path');
const del = require('del');
const { exec } = require('child_process');
const routing = require('../../../reverse-proxy/routing.json');

module.exports = class handleGit {

static async addReverseProxy(payload) {
    // console.log(payload);
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
                console.log(err, 'something when wrong on reversing the proxy');
                return;
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

    exec(`pm2 stop ${payload.name}`, {
        cwd: pathToReverse
        }, (err, stdout, stderr) => {
            if (err) {
                console.log(err, 'something when wrong on reversing the proxy');
                return;
            }
        }
    );

    // await fs.writeFile(pathToRouting, routingJSON, err => {
    //   if (err) throw err;
    // });
    // exec('cwd ' + pathToReverse);
    // console.log(exec('pwd'))
    // return exec(`pm2 stop ${payload.name}`, {
    //     cwd: pathToReverse
    //     }, (err, stdout, stderr) => {
    //         console.log ('To have stopped', stdout | stderr);            
    //         if (err) { 
    //             console.log(err, 'something when wrong on reversing the proxy');
    //             return err;
    //         }
    //     }
    // );
}

}