const router = require('express').Router();
const {exec, spawn} = require('child_process');
const util = require('util');
const promisifiedExec = util.promisify(exec); //Gör så att exec await kan användas

router.post('/test', async (req, res) => {
  console.log(req.body)
  await promisifiedExec(`cd repos && git clone ${req.body.url} ${req.body.projectName} && cd ${req.body.projectName} && npm install` );
  let process = spawn('npm.cmd', ['start'], {cwd: `./repos/${req.body.projectName}`})
  process.on('error', error => console.log('error: ' + error))
  process.stdout.on('data', (data) => console.log('data: ' + data))
 res.json(req.body)
})

module.exports = router