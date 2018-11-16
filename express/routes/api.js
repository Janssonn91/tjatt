const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const del = require("del");
const simplegit = require("simple-git/promise");
const {
  Docker
} = require('node-docker-api');

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
  // socketPath: '//./pipe/docker_engine'
});

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
    del(payload.localPath).then(() => git_clone(payload, res)) : git_clone(payload, res);

});

function git_clone(payload, res) {
  simplegit()
    .silent(true)
    .clone(payload.gitUrl, payload.localPath)
    .then(err => {
      console.log("Downloaded repo from: " + payload.gitUrl);
      console.log("Proceeding with building Docker image")
      prepare_docker_files(payload, res);
    })
    .catch(err => { console.log("error", err); res.json('err'); });
}


async function prepare_docker_files(payload,res) {
  let did = await create_docker_dockerfile(payload, res);
  did && create_docker_compose_file(payload,res)
}

async function get_used_ports(res) {
  return new Promise((resolve, reject) => {
    docker.container.list().then(containers => {
      let ports = containers.filter(container => {
        if (container.data.Ports.length == 1) {
          return true
        } else {
          return false
        }
      }).map(_container => {
        let _ports = _container.data.Ports.map(port => {
          return port.PublicPort
        })
        return _ports
      });
      resolve([].concat.apply([], ports));
    });
  })
}

async function select_docker_port(res) {
  let probePort = 49152;
  let found = false;
  let usedPorts = await get_used_ports(res);
  while (!found) {
    usedPorts.includes(probePort) ? probePort++ : (found = true);
  }
  return probePort;
}

function create_docker_dockerfile(payload, res) {
  let path = `./docker/${payload.uniqueProjectName}/Dockerfile`;
  return new Promise((promiseResult) =>{
    fs.writeFile(path, '', {
      flag: 'wx'
    }, function (err) {
      if (err) {
        console.log("Dockerfile already exists!")
        res.json('error ...');
        promiseResult(false);
      } else {
        fs.appendFileSync(path,
          `FROM mhart/alpine-node:latest
          WORKDIR /usr/src/app
          COPY package*.json ./
          RUN npm install
          COPY . .
          EXPOSE ${payload.webPort}
          CMD [ "npm", "start" ]`);
      };
      promiseResult(true);
    });
  });

}

function create_docker_compose_file(payload, res) {
  let path = `./docker/${payload.uniqueProjectName}/docker-compose.yml`;

  console.log('payload', payload)

  let data =
    `version: "2"
services:
  web:
    build: "../${payload.uniqueProjectName}"
    ports:
    - "${payload.dockerPort}:${payload.webPort}"
    depends_on:
    - mongo
    container_name: "${payload.uniqueProjectName}_app"
  mongo:
    image: mvertes/alpine-mongo
    expose:
    - "27017"
    container_name: "${payload.uniqueProjectName}_db"`;

  fs.writeFile(path, '', {
    flag: 'wx'
  }, function (err) {
    if (err) {
      console.log("Docker compose file already exists!");
      res.json('error');
    } else {
      fs.appendFileSync(path, data);
      start_containers_composer(payload, res);
    }
  });
}

const {
  exec
} = require('child_process');

function start_containers_composer(payload, res) {
  exec(`docker-compose up -d`, {
    cwd: payload.localPath
  }, (err, stdout, stderr) => {
    if (err) {
      res.json('error');
      throw (err);
    }
    res.json('ok');
    console.log(stdout || stderr);
  });
}

module.exports = router;