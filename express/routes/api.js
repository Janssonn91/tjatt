const router = require('express').Router();
const {exec} = require('child_process');

router.post('/test', (req, res) => {
  console.log(req.body.url)
  exec(`git clone ${req.body.url} music && cd music && npm i` );
 res.json(req.body)
})

module.exports = router