const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');
const simplegit = require('simple-git');

module.exports = function (app) {
    app.post('/updateRepo', async (req, res) => {
        let payload = {
            localPath : path.join(__dirname, "../../docker/" + req.body.projectName),
            gitUrl: req.body.gitUrl,
            projectName: req.body.projectName,
            appId: req.body.appId,
            res: res
        }
        git.git_pull(payload);
    });
};