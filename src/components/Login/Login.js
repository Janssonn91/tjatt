import './Login.scss';
@observer export default class Login extends Component {

  //Temporary for controlling logged in state
  @observable userLoggedIn = false;
  @observable loginError = false;

  start() {
    this.createStoreConnectedProperties({
      username: '',
      password: ''
    });
  }

  usernameChange(e) {
    this.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.password = e.currentTarget.value;
  }

  login() {
    const { username, password } = this;

    User.findOne({
      name: username,
      password: password
    }).then(user => {
      if (user) {
        this.userLoggedIn = true;
        this.loginError = false;
      } else {
        this.loginError = true;
      }
    });
  }
}
