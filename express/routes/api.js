const router = require('express').Router();
const {
  exec,
  spawn
} = require('child_process');
const util = require('util');
const promisifiedExec = util.promisify(exec); //Gör så att exec await kan användas
const fs = require('fs');
const path = require('path');
const buf = require('buffer').Buffer;

router.post('/addRepo', async (req, res) => {
  await promisifiedExec(
    `cd repos && git clone ${req.body.url} ${req.body.projectName} && cd ${
req.body.projectName
} && npm install`
  );
  // Change back params to 'npm' and ['start']
  // This is to get it to work with express apps
  let process = spawn('node', ['app'], {
    cwd: `./repos/${req.body.projectName}`
  });
  process.on('error', error => console.log('error: ' + error));
  process.stdout.on('data', data => console.log('data: ' + data));
  res.json(req.body);

  /**
   * Randomize a number between 1025-65535
   * to use as port number
   */
  function randomizePortNumber() {
    let newPortNumber = 1025 + Math.floor(Math.random() * 65535);
    // Protect our specific ports for Mongo etc
    let protectedPorts = [80, 443, 3000, 4500, 8080, 27017, 39812];
    for (let i = 0; i < protectedPorts.length; i++) {
      if (newPortNumber === protectedPorts[i]) {
        randomizePortNumber();
      }
    }
    return newPortNumber;
  }

  let port = randomizePortNumber();

  /**
   * On POST request:
   * use path.resolve to get correct working directory
   * read app.js to find current port number
   * Change port number to one chosen by us then
   * overwrite app.js file
   */
  await promisifiedExec(
    `cd ${path.resolve(`./repos/${req.body.projectName}`)}`, {},
    () => {
      const filePath = path.resolve(`./repos/${req.body.projectName}`);
      fs.readFile(filePath + '/app.js', (err, data) => {
        if (err) throw err;
        let appString = data.toString(); // returns Buffer we convert to string
        if (appString.includes('app.listen')) {
          let stringIndex = appString.indexOf('app.listen'); //find "app.listen"
          let portIndex = stringIndex + 11; // index of portnumber
          let portNumber = appString.slice(portIndex, portIndex + 4);
          let newString = appString.replace(portNumber, port);

          // If console log port differs from actual port
          let stringIndexInConsoleLog = appString.indexOf('istening on port');
          let portIndexInConsoleLog = stringIndexInConsoleLog + 17;
          let portNumberInConsoleLog = appString.slice(
            portIndexInConsoleLog,
            portIndexInConsoleLog + 4
          );
          // Replace all occurances
          newString = newString.replace(portNumberInConsoleLog, port);
          newString = newString.replace(portNumberInConsoleLog, port);
          console.log(newString);

          fs.writeFile(filePath + '/app.js', newString, err => {
            if (err) throw err;
          });
        }
      });
    }
  );
});


const { Docker } = require('node-docker-api');

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

const tar = require('tar-fs');

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

function build_image(_image, _cmd, _name) {
  let name = 'musicplayer'

  create_dockerfile( name )
  var tarStream = tar.pack('./docker/' + name)
  docker.image.build(tarStream, {
      t: 'testimg'
    })
    .then((stream) => promisifyStream(stream))
    .then(() => {
      create_container();
    })
    .catch((error) => console.log(error))
}

function create_container(_appPort) {
  let port = 3300
  
  let config = {
    Image: 'testimg',
    name: 'musik2',
    "HostConfig": {
      "PortBindings": { },
    }
  }

  config.HostConfig.PortBindings[`${port}/tcp`] = [ { HostPort: '8081' } ]

  docker.container.create(config)
  .then((container) => container.start())
  .catch((error) => console.log(error))
}

function create_dockerfile( name ){
  name = "musicplayer"

  let path = `docker/${name}/Dockerfile`;


  fs.writeFile( path, ''  , { flag: 'wx' }, function (err) {
    if (err) {
      console.log("Dockerfile already exists!")
    }
    else{
      fs.appendFileSync(path, 
`FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3300
CMD [ "npm", "start" ]`);
    }
    
  });
}

build_image();


module.exports = router;