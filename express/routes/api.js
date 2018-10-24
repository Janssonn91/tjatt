const router = require('express').Router();
const { exec, spawn } = require('child_process');
const util = require('util');
const promisifiedExec = util.promisify(exec); //Gör så att exec await kan användas
const fs = require('fs');
const path = require('path');
const buf = require('buffer').Buffer;

router.post('/addRepo', async (req, res) => {
  console.log(req.body);
  await promisifiedExec(
    `cd repos && git clone ${req.body.url} ${req.body.projectName} && cd ${
      req.body.projectName
    } && npm install`
  );
  let process = spawn('npm', ['start'], {
    cwd: `./repos/${req.body.projectName}`
  });
  process.on('error', error => console.log('error: ' + error));
  process.stdout.on('data', data => console.log('data: ' + data));
  res.json(req.body);

  /**
   * On POST request:
   * use path.resolve to get correct working directory
   * test writing a file to make sure the location is correct
   * and read app.js (after converting it from Buffer to string)
   */
  // await promisifiedExec(
  //   `cd ${path.resolve(`./repos/${req.body.projectName}`)}`,
  //   {},
  //   () => {
  //     console.log(
  //       'current directory: ' +
  //         path.resolve(`./repos/${req.body.projectName}\n`)
  //     );
  //     const filePath = path.resolve(`./repos/${req.body.projectName}`);
  //     fs.readFile(filePath + '/app.js', (err, data) => {
  //       if (err) throw err;
  //       let appString = data.toString(); // returns Buffer we convert to string
  //       if (appString.includes('app.listen')) {
  //         let stringIndex = appString.indexOf('app.listen'); //find "app.listen"
  //         let portIndex = stringIndex + 11; // index of portnumber ("3000")
  //         let portNumber = appString.slice(portIndex, portIndex + 4);
  //         let newString = appString.replace(portNumber.toString(), '3500');
  //         fs.writeFile(filePath + '/app.js', newString, err => {
  //           if (err) throw err;
  //         });
  //       }
  //     });
  //   }
  // );
});

module.exports = router;
