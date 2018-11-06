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

  showImportHandler(){
    this.showImport = !this.showImport;
  }

  showAppsHandler(){
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

  onSubmit(){
    this.importingRepo = true;
    this.importRepo(this.urlToSet,this.urlToSet);
    this.urlToSet = '';
    this.projectToSet = '';
  }

  async runningAppHandler(appId){
    this.importedApps.find(app=> app._id === appId).running = !this.importedApps.find(app=> app._id === appId).running;
    await this.importedApps.find(app=> app._id === appId).save();
    this.fetchRepos();
  }
  
}