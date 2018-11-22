const vms = require('../classes/handleVMs');
const fs = require('fs');
const path = require('path');
const del = require('del');

module.exports = function (app) {

    app.post('/updateRepo', async (req, res) => {

        let payload = {
            gitUrl: req.body.gitUrl,
            projectName: req.body.projectName,
            res: res
        }

        vms.git_pull(payload);
    });

};