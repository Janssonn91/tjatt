
// Require modules 
const fs = require('fs');
const path = require('path');
const del = require("del");
const simplegit = require("simple-git/promise");
const { Docker } = require('node-docker-api');
const { exec } = require('child_process');
const docker = new Docker({
  socketPath: '/var/run/docker.sock'
  //socketPath: '//./pipe/docker_engine'
});


module.exports = class HandleVMs {
  
  static git_clone(payload) {
    simplegit()
      .silent(true)
      .clone(payload.gitUrl, payload.localPath)
      .then(err => {
        console.log("Downloaded repo from: " + payload.gitUrl);
        console.log("Proceeding with building Docker image")
        this.prepare_docker_files(payload);
      })
      .catch(err => { console.log("error", err); payload.res.json('err'); });
  }


  static async prepare_docker_files(payload) {
    let did = await this.create_docker_dockerfile(payload);
    did && this.create_docker_compose_file(payload);
  }

  static async get_used_ports() {
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

  static async select_docker_port() {
    let probePort = 49152;
    let found = false;
    let usedPorts = await this.get_used_ports();
    while (!found) {
      usedPorts.includes(probePort) ? probePort++ : (found = true);
    }
    return probePort;
  }

  static create_docker_dockerfile(payload) {
    let path = `./docker/${payload.uniqueProjectName}/Dockerfile`;
    return new Promise((promiseResult) =>{
      fs.writeFile(path, '', {
        flag: 'wx'
      }, function (err) {
        if (err) {
          console.log("Dockerfile already exists!")
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

  static create_docker_compose_file(payload) {
    let path = `./docker/${payload.uniqueProjectName}/docker-compose.yml`;

// DO NOT INDENT THESE LINES
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
// NOW YOU CAN INDENT AGAIN!

    fs.writeFile(path, '', {
      flag: 'wx'
    }, (err) => {
      if (err) {
        console.log("Docker compose file already exists!");
      } else {
        fs.appendFileSync(path, data);
        this.start_containers_composer(payload);
      }
    });
  }

  
  static start_containers_composer(payload) {
    console.log(payload);
    exec(`docker-compose up -d`, {
      cwd: payload.localPath
    }, (err, stdout, stderr) => {
      if (err) {
        throw (err);
      }
      let response = Object.assign({}, payload, {res: null})
      payload.res.json(response);
      console.log(stdout || stderr);
    });
  }
}
