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
  let dockerPort = await select_docker_port();
  let uniqueProjectName = req.body.url.toLowerCase().replace(/(?:https:\/\/)?(?:www\.)?github.com\//, '').replace(/[^a-zA-Z0-9]/g, '') + dockerPort;

  let payload = {
    gitUrl: req.body.url.toLowerCase(),
    projectName: req.body.projectName,
    uniqueProjectName: uniqueProjectName,
    dockerPort: dockerPort,
    webPort: 3300,
    dbPort: 7000,
    localPath: path.join(__dirname, "../../docker/" + uniqueProjectName)
  }

  fs.existsSync(payload.localPath) ?
    del(payload.localPath).then(() => git_clone(payload)) : git_clone(payload);
});

function git_clone(payload) {
  simplegit()
    .silent(true)
    .clone(payload.gitUrl, payload.localPath)
    .then(err => {
      console.log("Downloaded repo from: " + payload.gitUrl);
      console.log("Proceeding with building Docker image")
      build_docker_image(payload, payload.uniqueProjectName);
    })
    .catch(err => console.log("error", err));
}


function build_docker_image(payload) {
  let name = payload.uniqueProjectName;
  create_docker_dockerfile(payload)

  var tarStream = tar.pack('./docker/' + name)
  docker.image.build(tarStream, {
      t: payload.uniqueProjectName
    })
    .then((stream) => promisifyStream(stream))
    .then(() => {
      create_docker_container(payload)
    })
    .catch((error) => console.log(error))
}

async function get_used_ports() {
  return new Promise((resolve, reject) => {
    docker.container.list().then(containers => {
      let ports = containers.map(container => {
        return container.data.Ports[0].PublicPort;
      });
      resolve(ports);
    });
  })
}


async function select_docker_port() {
  let probePort = 49152;
  let found = false;
  let usedPorts = await get_used_ports();

  while (!found) {
    usedPorts.includes(probePort) ? probePort++ : (found = true);
  }

  return probePort;
  //create_docker_container(_name, probePort);
}

function create_docker_container(payload) {

  let config = {
    Image: payload.uniqueProjectName,
    name: payload.uniqueProjectName,
    "HostConfig": {
      "PortBindings": {},
    }
  }

  config.HostConfig.PortBindings[`${payload.webPort}/tcp`] = [{
    HostPort: `${payload.dockerPort}`
  }]

  docker.container.create(config)
    .then((container) => {
      //container.start()
    })
    .catch((error) => console.log(error))
}

function create_docker_dockerfile(payload) {
  let path = `./docker/${payload.uniqueProjectName}/Dockerfile`;

  fs.writeFile(path, '', {
    flag: 'wx'
  }, function (err) {
    if (err) {
      console.log("Dockerfile already exists!")
    } else {
      fs.appendFileSync(path,
        `FROM mhart/alpine-node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${payload.webPort}
CMD [ "npm", "start" ]`);
    }

  });
}

function create_docker_compose_file(payload){

let data =
`version: "2"
services:
  web:
    build: ../${payload.uniqueProjectName}
    ports:
    - "hostport:3000"
    depends_on:
    - mongo
    container_name: "unique-name-app"
  mongo:
    build: ../${payload.uniqueProjectName}
    expose:
    - "27017"
    container_name: "unique-name-db"`
    
}


const { exec } = require('child_process');

function start_containers_composer(){
  exec('docker-compose ', (err, stdout, stderr) => {
    if (err) { throw (err); }
    console.log(stdout || stderr);
    
  });
}



module.exports = router;