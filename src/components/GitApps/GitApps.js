import './GitApps.scss';
@observer export default class GitApps extends Component{

@observable urlToSet = '';
@observable portToSet = '';
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
@observable runningAppDropdown = false ;

    async start(){
        this.createStoreConnectedProperties({
            repo: []
        });
        this.importingApps = true;
        await this.fetchRepos();
    }

    async addRepo(name, url, port){
        // await sleep(5000);
        await Repo.create({
            name: name,
            url: `http://localhost:${port}/`,
            gitUrl: url,
            port: port,
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

    onWebPortChangeHandler(e){
        this.portToSet = e.currentTarget.value;
        
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
        this.openApp._id === app._id ? this.openApp = {} : this.openApp = app;
    }
    closeAppHandler(){
        this.openApp = {}
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

    onSubmit(){
        this.importingRepo = true;
        fetch('/api/addRepo', { 
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({url: this.urlToSet, projectName: this.projectToSet, webPort: this.portToSet}), // data can be `string` or {object}!
          method: 'POST' // or 'PUT'
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.addRepo(response.uniqueProjectName,response.gitUrl, response.dockerPort);
            this.urlToSet = '';
            this.portToSet = '';
            this.projectToSet = '';
            this.importingRepo = false;
        })
        .catch(error=>console.log(error));

        //this should be removed when the fetch method is uncommented
        // this.importRepo(this.urlToSet,this.urlToSet);
        // this.urlToSet = '';
        // this.projectToSet = '';
        
    }
  
}