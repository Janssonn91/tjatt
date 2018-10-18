import './Sidebar.scss';

@withRouter @observer export default class Sidebar extends Component {
  async start() {}

  @observable collapseOpen = false;
  @observable userLoggedIn;
  @observable test;
 
  toggle(){
    this.collapseOpen = !this.collapseOpen;
    console.log("körs");
  }

  logout(){
    console.log(this.props);
    this.props.logout(this.changeLogStatus.bind(this));
  }

  changeLogStatus(){
    return false;
  }

}