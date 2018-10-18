import './Sidebar.scss';

@withRouter @observer export default class Sidebar extends Component {
  async start() {}

  @observable collapseOpen = false;
  @observable userLoggedIn;
 
  toggle(){
    this.collapseOpen = !this.collapseOpen;
    console.log("körs");
  }

  logout(){
    console.log('hej din get');
    this.userLoggedIn = false;
  }

}