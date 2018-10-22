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
    // update login status in MongoDB
    this.stores.Login.user = { ...this.stores.Login.user, status: false };
    const currentUser = new User(this.stores.Login.user);
    currentUser.save();
    // update login status in the store
    this.stores.Login.userLoggedIn = false;
    this.stores.Login.user = initialUser;
    this.props.history.push('/');
  }

}