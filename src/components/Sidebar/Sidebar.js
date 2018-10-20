import './Sidebar.scss';
import { initialUser } from '../Login/Login';

@withRouter @observer export default class Sidebar extends Component {
  start() { }

  @observable collapseOpen = false;

  toggle() {
    this.collapseOpen = !this.collapseOpen;
    console.log("körs");
  }

  logout() {
    this.stores.Login.userLoggedIn = false;
    this.stores.Login.user = initialUser;
    this.props.history.push('/');
  }

}