import './GitAppsSidebar.scss';
@observer export default class GitAppsSidebar extends Component{

@observable urlToSet = '';
@observable portToSet = '';
@observable projectToSet = '';
@observable importedApps = [];
@observable runningApps = [];
@observable openApp = {};
// @observable showSidedrawer = this.props.open;
@observable showSidedrawer = true;
@observable showImport = false;
@observable showApps = true;
@observable importingRepo = false;
@observable importingApps = false;
@observable loadingStatus = 0;
@observable runningAppDropdown = false ;

    async start(){
        this.importingApps = true;
        await this.fetchRepos();
        // this.createStoreConnectedProperties({
        //     apps: this.importedApps
        // });
    }

    async addRepo(name, url, port){
        await Repo.create({
            name: name,
            url: `http://localhost:${port}/`,
            gitUrl: url,
            port: port,
            running: true,
            branchesCollapseOpen: false
        })
        .then(response=>{
            this.importingRepo = false;
            this.fetchRepos();
        })
        .catch(
            error=>console.log(error)
        );
    }

    async fetchRepos(){
        this.importedApps = await Repo.find();
        this.importingApps = false;
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
        this.props.onClose();
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
        this.props.onOpenApp(app)
    }

    closeAppHandler(){
        this.openApp = {}
    }

    onOpenBranchesHandler(app){
        // this.importedApps.find(item => item._id === app._id).branchesCollapseOpen = !this.importedApps.find(item => item._id === app._id).branchesCollapseOpen
        const appToOpen = this.importedApps.find(item => item._id === app._id);
        appToOpen.branchesCollapseOpen = !appToOpen.branchesCollapseOpen;
        console.log(this.importedApps);
    }

    onUrlChangeHandler(e){
        this.urlToSet = e.currentTarget.value;
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
        
    }

    onGetBranches(app){
        var regex = /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/;
        const gitUrl = app.gitUrl + '.git'
        if(regex.test(gitUrl)){
            fetch('/api/getBranch', {
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({url: gitUrl, name: app.name}), // data can be `string` or {object}!
                method: 'POST' // or 'PUT'
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error=>console.log(error));    
        }

    }

    onPullApp(appId){ 
        const appToupdate = this.importedApps.find(app => app._id === appId);
        fetch('/api/updateRepo', { 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({gitUrl: appToupdate.gitUrl, projectName: appToupdate.name, appId: appToupdate._id}), // data can be `string` or {object}!
            method: 'POST' // or 'PUT'
          })
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(error=>console.log(error));

    }

    async startAppHandler(appId){
        
        const appToStart = this.importedApps.find(app => app._id === appId);
        fetch('/api/startGitApp', { 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name: appToStart.name, appRunning: appToStart.running}), // data can be `string` or {object}!
            method: 'POST' // or 'PUT'
        })
        .then(response => response.json())
        .then(response => {
            const app = this.importedApps.find(app=> app._id === appId);
            app.running = !app.running;
            app.save()
            .then(response => this.fetchRepos())
            .catch(error => console.log(error));
            
            this.runningApps = this.importedApps.filter(app=>app.running===true);
            this.openApp._id === appId ? this.openApp = {} : null;

            const appToChange = this.importedApps.find(app => app.name === response.name);
            app.running ? this.onGetBranches(appToChange) : null;
            // app.branchesCollapseOpen = !app.branchesCollapseOpen;
        })
        .catch(error=>console.log(error));
    }

    async deleteRepo(appId){          
        const appToDelete = this.importedApps.find(app => app._id === appId);
        fetch('/api/deleteGitApp', { 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name: appToDelete.name, appRunning: appToDelete.running}), // data can be `string` or {object}!
            method: 'POST' // or 'PUT' 
          })
        await this.importedApps.find(app => app._id === appId).delete()
            .then(response => {
                console.log('removed', response)
            })
            .catch(
                error => console.log(error)
            );
        this.fetchRepos();

    }
  
}