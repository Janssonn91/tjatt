// Require modules 
const fs = require('fs');
const path = require('path');
const del = require("del");
const simplegitPromise = require("simple-git/promise");
const simplegit = require('simple-git');
const { Docker } = require('node-docker-api');
const { exec } = require('child_process');
const rp = require('./handleReverseProxy');
const docker = new Docker({
  socketPath: '/var/run/docker.sock'
  // socketPath: '//./pipe/docker_engine'
});


module.exports = class HandleVMs {

  static async prepare_docker_files(payload) {
    let did = await this.create_docker_dockerfile(payload);
    did && this.create_docker_compose_file(payload);
    
  }

  static async get_used_ports() {
    return new Promise((resolve, reject) => {
      docker.container.list().then(containers => {
        let ports = containers.filter(container => {
          return container.data.Ports.length !== 0
        }).map(item => {
          let _ports = item.data.Ports.map(port => {
            return port.PublicPort
          })
          return _ports.filter(item=> item !== undefined);
        });
        resolve([].concat.apply([], ports));
      });
    })
  }

  static async select_docker_port() {
    let probePort = 49160;
    // let found = false;
    // let usedPorts = await this.get_used_ports();
    // // Randomize a port between 49152-65535 (publicly available ports)
    // while (!found) {
    //   usedPorts.includes(probePort) ? probePort += Math.floor(Math.random() * 16382) : (found = true);
    // }
    return probePort += Math.floor(Math.random() * 16382);
  }

  static create_docker_dockerfile(payload) {
    let path = `./docker/${payload.uniqueProjectName}/Dockerfile`;
    return new Promise((promiseResult) => {
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
    // rp.addReverseProxy(payload.uniqueProjectName, payload.dockerPort);
    // DO NOT INDENT THESE LINES
    let data =
      `version: "2"
services:
  web:
    build: "../${payload.uniqueProjectName}"
    ports:
    - "${payload.dockerPort}:${payload.webPort}"
    container_name: "${payload.uniqueProjectName}_app"`;
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
    return new Promise((resolve, reject) => {
      exec(`docker-compose up -d`, {
        cwd: payload.localPath
      }, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        let response = Object.assign({}, payload, {
          res: null
        })
        payload.res.json(response);
        console.log(stdout || stderr);
        docker.container.list().then(containers => containers[0].status());
        // rp.startReverseProxy(payload.uniqueProjectName || payload.name);
        resolve();
      });
    }); 
  }

  static stop_container(payload, toBeRemoved = false) {
    console.log('Container stop');
    return new Promise((resolve, reject) => {
      exec(`docker stop ${payload.name}_app`, (err, stdout, stderr) => {        
        if (err) {
          reject(err);
        }
        let response = Object.assign({}, payload, {
          res: null
        })
        if(!toBeRemoved){
          payload.res.json(response);
        }
        // rp.stopReverseProxy(payload.name);
        resolve();
      });
      
    }); 
    
  }

  static async remove_container(payload) {
    console.log('Container remove')
    return new Promise((resolve, reject) => {
      exec(`docker rm ${payload.name}_app`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        let response = Object.assign({}, payload, {
          res: null
        })
        payload.res.json(response);
        rp.removeReverseProxy(payload);
        resolve();
      });
    });
  };

  static async remove_docker_directory(payload, toBeRemoved = false) {
      return new Promise((resolve, reject) => {
        exec(`rm -r ./docker/${payload.name}`, (err, stdout, stderr) => { 
          if (err) {
            reject(err);
          }
          let response = Object.assign({}, payload, {
            res: null
          })
          if(!toBeRemoved){
            payload.res.json(response);
          }
          resolve();
          console.log('Directory removed!')
        });
      });
    };


  static docker_rebuild_image(payload) {
    exec(`docker-compose build`, {
      cwd: payload.localPath
    }, (err, stdout, stderr) => {
      if (err) {
        throw (err);
      }
      //let response = Object.assign({}, payload, {res: null})
      //payload.res.json(response);
      console.log(stdout || stderr);
      this.start_containers_composer(payload)
    });
  }

  static restart_docker_container(payload) {
    docker.container.list()
      .then(containers => {
        let containerToRestart = containers.map(containers => {
          console.log("Container name: " + containers.data.Names, "\nContainer id: " + containers.data.Id + "\n");
          //get correct container by name or id?
        })
      });
  }

}