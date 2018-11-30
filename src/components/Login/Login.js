import './Login.scss';

@inject('userStore', 'channelStore') @withRouter @observer export default class Login extends Component {

  @observable collapseOpen = false;
  @observable username = '';
  @observable password = '';
  @observable loginError = false;


  componentDidMount() {
    this.loginError = false;
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

  login(username, password) {
    fetch('/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.userStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          this.props.userStore.fetchContact();
          this.props.history.push(`/${this.props.userStore.user.username}/info`);
          socket.emit("login", this.props.userStore.user._id);
        }
        else {
          this.loginError = true;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.login(this.username, this.password);
    document.getElementById('password').value = '';
    document.getElementById('username').value = '';
    this.username = '';
    this.password = '';
  }
}
