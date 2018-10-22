const router = require('express').Router();
const {exec, spawn} = require('child_process');
const util = require('util');
const promisifiedExec = util.promisify(exec); //Gör så att exec await kan användas

router.post('/test', async (req, res) => {
  console.log(req.body)
  await promisifiedExec(`cd repos && git clone ${req.body.url} ${req.body.projectName} && cd ${req.body.projectName} && npm i` );
  

 res.json(req.body)
})

module.exports = router