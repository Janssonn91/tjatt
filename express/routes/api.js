const router = require('express').Router();
const { exec, spawn } = require('child_process');
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
  // Change back params to 'npm and ['start']
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
   * ** SPAGHETTI CODE WARNING **
   */
  await promisifiedExec(
    `cd ${path.resolve(`./repos/${req.body.projectName}`)}`,
    {},
    () => {
      const filePath = path.resolve(`./repos/${req.body.projectName}`);
      fs.readFile(filePath + '/app.js', (err, data) => {
        if (err) throw err;
        let appString = data.toString(); // returns Buffer we convert to string
        if (appString.includes('app.listen')) {
          let stringIndex = appString.indexOf('app.listen'); //find "app.listen"
          let portIndex = stringIndex + 11; // index of portnumber ("3000")
          let portNumber = appString.slice(portIndex, portIndex + 4);
          let newString = appString.replace(portNumber.toString(), port);

          let stringIndexInConsoleLog = appString.indexOf('listening on port');
          let portIndexInConsoleLog = stringIndexInConsoleLog + 18;
          let portNumberInConsoleLog = appString.slice(
            portIndexInConsoleLog,
            portIndexInConsoleLog + 4
          );
          newString = newString.replace(
            portNumberInConsoleLog.toString(),
            port
          );
          fs.writeFile(filePath + '/app.js', newString, err => {
            if (err) throw err;
          });
        }
      });
    }
  );
});

module.exports = router;
