const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');

module.exports = function (app) {

    app.post('/getBranch', async (req, res) => {
        let uniqueProjectName = req.body.url.toLowerCase().replace(/(?:https:\/\/)?(?:www\.)?github.com\//, '').replace(/[^a-zA-Z0-9]/g, '');
       
        let payload = {
            gitUrl: req.body.url.toLowerCase(),
            uniqueProjectName: uniqueProjectName,
            localPath: path.join(__dirname, "../../docker/" + uniqueProjectName),
            res: res
        }
        git.git_branch(payload)
    });

};