const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');

module.exports = function (app) {

    app.post('/changeBranch', async (req, res) => {
    console.log( path.join(__dirname, "../../docker/" + req.body.app.name))
        let payload = {
            localPath: path.join(__dirname, "../../docker/" + req.body.app.name),
            branch: req.body.branch,
            res: res
        }
        git.git_checkout(payload);
    });

};