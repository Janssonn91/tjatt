const vms = require('../classes/handleVMs');
const fs = require('fs');
const path = require('path');
const del = require('del');

module.exports = function (app) {

    app.post('/addRepo', async (req, res) => {
        let dockerPort = await vms.select_docker_port();
        let uniqueProjectName = req.body.url.toLowerCase().replace(/(?:https:\/\/)?(?:www\.)?github.com\//, '').replace(/[^a-zA-Z0-9]/g, '') + dockerPort;
       
        let payload = {
            gitUrl: req.body.url.toLowerCase(),
            projectName: req.body.projectName,
            uniqueProjectName: uniqueProjectName,
            dockerPort: dockerPort,
            webPort: req.body.webPort,
            dbPort: 7000,
            localPath: path.join(__dirname, "../../docker/" + uniqueProjectName),
            res: res
        }
        vms.git_branch(payload)

        //fs.existsSync(payload.localPath) ?
        //    del(payload.localPath).then(() => vms.git_clone(payload)) : vms.git_clone(payload);

    });

};