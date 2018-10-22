const router = require('express').Router();
const {exec, spawn} = require('child_process');

router.post('/test', (req, res) => {
  console.log(req.body)
  exec(`cd repos && git clone ${req.body.url} ${req.body.projectName} && cd ${req.body.projectName} && npm i` );
 res.json(req.body)
})

module.exports = router