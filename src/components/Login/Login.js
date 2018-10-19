import './Login.scss';

const initialUser = {
  id: '',
  username: '',
  password: '',
  nickname: '',
  image: '',
  status: false,
  date: 0,
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
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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
      username: username,
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
