const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');
const rp = require('../classes/handleReverseProxy');



module.exports = function (app) {

    app.post('/deleteGitApp', async (req, res) => {
        let payload = {
            localPath: path.join(__dirname, "../../docker/" + req.body.name),
            appRunning: req.body.appRunning,
            name: req.body.name,
            uniqueProjectname: req.body.uniqueProjectname,
            res: res
        };
        await vms.stop_container(payload, true);
        await vms.remove_container(payload);
        await vms.remove_docker_directory(payload, true);
        await rp.removeReverseProxy(payload);
    }); 
};