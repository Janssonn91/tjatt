import './Login.scss';

const initialUser = {
  id: 0,
  name: '',
  password: '',
  nickname: '',
  image: '',
  status: false,
  group: [],
  contact: []
};

@observer export default class Login extends Component {

  //Temporary for controlling logged in state
  @observable userLoggedIn = false;
  @observable loginError = false;

  start() {
    this.createStoreConnectedProperties({
      user: initialUser
    });
  }

  usernameChange(e) {
    this.user.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.user.password = e.currentTarget.value;
  }

  login() {
    const { username, password } = this.user;

    User.findOne({
      name: username,
      password: password
    }).then(user => {
      if (user) {
        this.user = user;
        this.userLoggedIn = true;
        this.loginError = false;
      } else {
        this.loginError = true;
      }
    });
  }
}
