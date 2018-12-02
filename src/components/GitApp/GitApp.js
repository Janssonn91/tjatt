import './GitApp.scss';
@observer export default class GitApp extends Component{

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
@observable openGitAppsSidebar = false;

    async start(){
        this.createStoreConnectedProperties({
        });
    }

    openGitAppsSidebarHandler(){
        this.openGitAppsSidebar = !this.openGitAppsSidebar;
    }

    openAppHandler(app){
        this.openApp._id === app._id ? this.openApp = {} : this.openApp = app;
    }
  
}