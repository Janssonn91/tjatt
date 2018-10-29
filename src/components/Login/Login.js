import './Login.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Login extends Component {

  @observable collapseOpen = false;
  @observable username = '';
  @observable password = '';

  componentWillMount() {
    this.checkIfLoggedIn();
  }

  toggle() {
    this.collapseOpen = !this.collapseOpen;
  }

  usernameChange(e) {
    this.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.password = e.currentTarget.value;
  }

  checkIfLoggedIn() {
    this.props.loginStore.checkIfLoggedIn();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginStore.login(this.username, this.password);
  }

}