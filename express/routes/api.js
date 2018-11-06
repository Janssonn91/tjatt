const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const del = require("del");
const tar = require('tar-fs');
const simplegit = require("simple-git/promise");
const {
  Docker
} = require('node-docker-api');

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log('.'))
  stream.on('end', resolve)
  stream.on('error', reject)
})

router.post('/addRepo', async (req, res) => {
  let gitUrl = req.body.url.toLowerCase();
  let processName = req.body.projectName;
  let uniqueProjectName = gitUrl.replace(/(?:https:\/\/)?(?:www\.)?github.com\//, '').replace(/[^a-zA-Z0-9]/g, '');
  let localPath = path.join(__dirname, "../../docker/" + uniqueProjectName);

  fs.existsSync(localPath) ?
    del(localPath).then(() => git_clone(gitUrl, localPath, processName, uniqueProjectName)) : git_clone(gitUrl, localPath, processName, uniqueProjectName);
});


function build_docker_image(_name) {
  let name = _name

  create_docker_dockerfile(name)
  var tarStream = tar.pack('./docker/' + name)
  docker.image.build(tarStream, {
      t: _name
    })
    .then((stream) => promisifyStream(stream))
    .then(() => {
      create_docker_container(_name);
    })
    .catch((error) => console.log(error))
}

function get_docker_public_ports(){
  docker.container
  .list()
  .then(containers => {
    //console.log("containers", containers[0].data.Ports[0].PublicPort);
    let ports = containers.map(container => {
      return container.data.Ports[0].PublicPort
    })
  })

  .catch(error => console.log(error));
}

function create_docker_container(_name) {
  let port = 3000

  let config = {
    Image: _name,
    name: _name,
    "HostConfig": {
      "PortBindings": {},
    }
  }


  config.HostConfig.PortBindings[`${port}/tcp`] = [{
    HostPort: '8082'
  }]

  docker.container.create(config)
    .then((container) => container.start())
    .catch((error) => console.log(error))
}

function create_docker_dockerfile(_name) {
  let name = _name

  let path = `./docker/${name}/Dockerfile`;
  console.log("path", path)

  fs.writeFile(path, '', {
    flag: 'wx'
  }, function (err) {
    if (err) {
      console.log("Dockerfile already exists!")
    } else {
      fs.appendFileSync(path,
        `FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]`);
    }

  });
}

function git_clone(_url, _localPath, _processName, _uniquePathName) {
  simplegit()
    .silent(true)
    .clone(_url, _localPath)
    .then(err => {
      console.log("Downloaded repo from: " + _url);
      console.log("Proceeding with building Docker image")
      build_docker_image(_uniquePathName);
    })
    .catch(err => console.log("error", err));
}

module.exports = router;