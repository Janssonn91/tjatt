const vms = require('../classes/handleVMs');
const git = require('../classes/handleGit');
const fs = require('fs');
const path = require('path');
const del = require('del');
const rp = require('../classes/handleReverseProxy');


module.exports = function (app) {

    app.post('/addRepo', async (req, res) => {
        let dockerPort = await vms.select_docker_port();
        let uniqueProjectName = req.body.url.toLowerCase().replace(/(?:https:\/\/)?(?:www\.)?github.com\//, '').replace(/[^a-zA-Z0-9]/g, '') + dockerPort;
       console.log(dockerPort, 'dockerPort');
       console.log(req.body.url);
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
        // await rp.addReverseProxy(payload);
        fs.existsSync(payload.localPath) ?
           del(payload.localPath).then(() => git.git_clone(payload)) : git.git_clone(payload);
    });

};