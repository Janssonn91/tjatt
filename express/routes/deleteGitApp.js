const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');

module.exports = function (app) {

    app.post('/deleteGitApp', async (req, res) => {
        let payload = {
            localPath: path.join(__dirname, "../../docker/" + req.body.name),
            appRunning: req.body.appRunning,
            name: req.body.name,
            res: res
        };
        console.log(payload.localPath)

        // await vms.stop_container(payload);
        await vms.remove_container(payload); 


    }); 
};