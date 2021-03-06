import './GitAppsSidebar.scss';
@observer export default class GitAppsSidebar extends Component{

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
@observable openBranches = null;
@observable startingApp = null;

    async start(){
        this.importingApps = true;
        await this.fetchRepos();
    }

    async addRepo(name, url, port, branches){
        await Repo.create({
            name: name,
            // url: `http://localhost:${port}/`,
            url: `${name}.tjatt.net`, // UNCOMMENT THIS LINE WHEN GO LIVE
            gitUrl: url,
            port: port,
            running: true,
            branches: branches
        })
        .then(response=>{
            this.importingRepo = false;
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
        if(e.key ==='Enter'){this.submit()}
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

    openAppHandler(app){
        this.openApp._id === app._id ? this.openApp = {} : this.openApp = app;
        this.props.onOpenApp(app);
    }

    closeAppHandler(){
        this.openApp = {}
    }

    onOpenBranchesHandler(app){
        this.openBranches !== app._id ? this.openBranches = app._id : this.openBranches = null;
    }

    onUrlChangeHandler(e){
        this.urlToSet = e.currentTarget.value;
    }

    async onSubmit(){
        this.importingRepo = true;
        fetch('/api/addRepo', { 
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({url: this.urlToSet, projectName: this.projectToSet, webPort: this.portToSet}), // data can be `string` or {object}!
          method: 'POST' // or 'PUT'
        })
        .then(response => response.json())
        .then(async response => {
            await this.addRepo(
                response.uniqueProjectName,
                response.gitUrl, 
                response.dockerPort,
                await this.onGetBranches({name: response.uniqueProjectName, gitUrl: response.gitUrl})
            );
            await this.fetchRepos();
            this.urlToSet = '';
            this.portToSet = '';
            this.projectToSet = '';
            this.importingRepo = false;
        })
        .catch(error=>console.log(error));
    }

    async onGetBranches(app){
        let branches = null;
        var regex = /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/;
        const gitUrl = app.gitUrl + '.git'
        if(regex.test(gitUrl)){
            await fetch('/api/getBranch', {
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({url: gitUrl, name: app.name}), // data can be `string` or {object}!
                method: 'POST' // or 'PUT'
            })
            .then(response => response.json())
            .then(response => {
                branches = response.branches;
                return branches;
            })
            .catch(error=>console.log(error));    
        }
        return branches;
    }


    async changeBranch(branch, app){ console.log(app)
        await fetch('/api/changeBranch', {
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({branch: branch, app: app}), // data can be `string` or {object}!
            method: 'POST' // or 'PUT'
        })
        .then(response => response.json())
        .then(async response => {
            await this.props.onOpenApp(app);
            return response; 
        })
        .catch(error=>console.log(error));
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
        const app = this.importedApps.find(app=> app._id === appId);
        app.running = !app.running;
        !app.running ? window.history.pushState({urlPath:'/git-app'},"",'/git-app') : null;
        !app.running ? this.props.onOpenApp({}) : null;
        !app.running ? this.openBranches = null : null;
        this.openApp._id === appId ? this.openApp = {} : null;
        this.startingApp = appId;
        fetch('/api/startGitApp', { 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name: appToStart.name, appRunning: appToStart.running}), // data can be `string` or {object}!
            method: 'POST' // or 'PUT'
        })
        .then(response => response.json())
        .then(async response => {
            await app.save();
            await this.fetchRepos();
            const appToChange = this.importedApps.find(app => app.name === response.name);
            app.running ? this.onGetBranches(appToChange) : null;
            this.startingApp = null;
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