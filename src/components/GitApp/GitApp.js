import './GitApp.scss';
@observer export default class GitApp extends Component{

@observable importedApps = [];
@observable openApp = {};
@observable openGitAppsSidebar = true;
@observable chatSidebar = false;

    async start(){
        this.createStoreConnectedProperties({
        });
        this.importedApps = await Repo.find();
        const appName = window.location.href.split('/').pop();
        this.openApp === this.importedApps.find(app => app.name === appName);
    }

    openGitAppsSidebarHandler(){
        this.chatSidebar ? this.chatSidebar = false : null;
        this.openGitAppsSidebar = !this.openGitAppsSidebar;
    }

    openChatSidebarHandler(){
        this.openGitAppsSidebar ? this.openGitAppsSidebar = false : null;
        this.chatSidebar = !this.chatSidebar;
    }

    openAppHandler(app){
        this.openGitAppsSidebar && !Object.keys(this.openApp).length ? this.openGitAppsSidebar = false : null;
        this.openApp._id === app._id ? this.openApp = {} : this.openApp = app;
    }
  
}