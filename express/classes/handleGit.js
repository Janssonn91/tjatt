
// Require modules 
const fs = require('fs');
const path = require('path');
const del = require("del");
const simplegitPromise = require("simple-git/promise");
const simplegit = require('simple-git');
const { exec } = require('child_process');
const vms = require('./handleVMs');



module.exports = class handleGit {

// static git_branch(payload) {
//     if(fs.existsSync(payload.localPath)){
//       simplegit(payload.localPath)
//         .branch(function (err, branchSummary) {
//           payload.res.json({branches: (branchSummary.all)})
//       })
//     }else{
//       simplegitPromise()
//       .silent(true)
//       .clone(payload.gitUrl, payload.localPath)
//       .then(err => {
//         simplegit(payload.localPath)
//         .branch(function (err, branchSummary) {
//           payload.res.json({branches: (branchSummary.all)})
//       })
//       })
//       .catch(err => { console.log("error", err); payload.res.json('err'); });
//     }
//   }
  
  static git_clone(payload) {
    console.log('git clone');
    simplegitPromise()
      .silent(true)
      .clone(payload.gitUrl, payload.localPath)
      .then(err => {
        console.log("Downloaded repo from: " + payload.gitUrl);
        console.log("Proceeding with building Docker")
        vms.prepare_docker_files(payload);
      })
      .catch(err => { console.log("error", err); payload.res.json('err'); });
  }

  static git_pull(payload) {
    simplegitPromise(payload.localPath)
      .silent()
      .pull()
      .then(() => {
        console.log("Pulled repo from: " + payload.gitUrl);
      })
      .then(vms.docker_rebuild_image(payload))  
      .catch(err => { console.log("error", err); payload.res.json('err'); })
  }

}