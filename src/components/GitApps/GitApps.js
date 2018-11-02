import './GitApps.scss';
@observer export default class GitApps extends Component{

@observable urlToSet = '';
@observable projectToSet = '';
@observable importedApps = [];
@observable showSidedrawer = true;
@observable showImport = false;
@observable showApps = true;
@observable importingRepo = false;
@observable importingApps = false;
@observable loadingStatus = 0;

  async start(){
    this.createStoreConnectedProperties({
      repo: []
    });
    this.importingApps = true;
    await this.fetchRepos();
  }

  addRepo(name, url){
    console.log('adding to mongo');
    Repo.create({
      name: name,
      url: url,
      port: "port",
    })
  }

  async fetchRepos(){
    this.importedApps = await Repo.find();
    this.importingApps = false;
  }

  editText(e){
    this.urlToSet = e.currentTarget.value;
  }

  editProjectName(e){
    this.projectToSet = e.currentTarget.value;

  }

  checkForEnter(e){
    if(e.key ==='Enter'){
    this.submit()
    }
  }

  sideDrawerHandler(){
    this.showSidedrawer = !this.showSidedrawer;
  }

  showImportHandler(){
    this.showImport = !this.showImport;
  }

  showAppsHandler(){
      this.showApps = !this.showApps;
  }

  async fakeImport(){
    let start = 0;
    const frame = () => {
    if (start >= 100) {
        clearInterval(progress);
    } else {
        this.loadingStatus = start;
        start++; 
    }
    }
    let progress = setInterval(frame, 30);
    await sleep(3000);  
    this.importingRepo = false;
  }

  submit = () => {
    // console.log(this.urlToSet);
    // fetch('/api/addRepo', { 
    //   headers:{'Content-Type': 'application/json'},
    //   body: JSON.stringify({url: this.urlToSet, projectName: this.projectToSet}), // data can be `string` or {object}!
    //   method: 'POST' // or 'PUT'
    // })
    // this.addRepo(this.projectToSet, this.urlToSet);
    this.urlToSet = '';
    this.projectToSet = '';
    this.importingRepo = true;
    this.fetchRepos();
    this.fakeImport();
  }





  
}