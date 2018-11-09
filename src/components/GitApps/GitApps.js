import './GitApps.scss';
@observer export default class GitApps extends Component{

@observable urlToSet = '';
@observable projectToSet = '';
@observable importedApps = [];
@observable runningApps = [];
@observable openApp = {};
@observable showSidedrawer = true;
@observable showImport = false;
@observable showApps = true;
@observable importingRepo = false;
@observable importingApps = false;
@observable loadingStatus = 0;
@observable runningAppDropdown = false 

  async start(){
    this.createStoreConnectedProperties({
      repo: []
    });
    this.importingApps = true;
    await this.fetchRepos();
    console.log(this.importedApps);
  }

  async importRepo(name, url){
    await sleep(1000);
    await Repo.create({
      name: name,
      url: url,
      port: "port",
      running: false
    })
    .then(response=>{
      this.importingRepo = false;
      this.fetchRepos();
      // this.importedApps.push(response);
    })
    .catch(
      error=>console.log(error)
    );
  }

  async deleteRepo(appId){
    await this.importedApps.find(app=>app._id === appId).delete()
    .then(response=>{
      console.log('removed', response)
    })
    .catch(
      error=>console.log(error)
    );
    this.fetchRepos();
  }

  async fetchRepos(){
    this.importedApps = await Repo.find();
    this.importingApps = false;
  }

  onUrlChangeHandler(e){
    this.urlToSet = e.currentTarget.value;
  }

  checkForEnter(e){
    if(e.key ==='Enter'){
      this.submit()
    }
  }

  sideDrawerHandler(){
    this.showSidedrawer = !this.showSidedrawer;
  }

  sideDrawerShowImportHandler(){
    this.showImport = !this.showImport;
  }

  sideDrawerShowAppsHandler(){
      this.showApps = !this.showApps;
  }

  onSubmitEnterHandler(event) {
    if(event.key === 'Enter'  ){
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmitClickHandler(){
    this.onSubmit();
  }

  runningAppDropdownHandler(){
    this.runningAppDropdown = !this.runningAppDropdown;
  }

  openAppHandler(app){
    this.openApp = app;
  }

  onSubmit(){
    this.importingRepo = true;
    this.importRepo(this.urlToSet,this.urlToSet);
    this.urlToSet = '';
    this.projectToSet = '';
  }

  async runningAppHandler(appId){
    const app = this.importedApps.find(app=> app._id === appId);
    //this changes the running status
    app.running = !app.running;
    //this saves the new running status on the database so when we initially land on the page know which apps are running
    await app.save();
    this.fetchRepos();
    //this creates an array of only running apps
    this.runningApps = this.importedApps.filter(app=>app.running===true);
    //this closes the open app if the running process is stoped
    this.openApp._id === appId ? this.openApp = {} : null;
  }
  
}