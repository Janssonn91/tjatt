import './Login.scss';

export const initialUser = {
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

@withRouter @observer export default class Login extends Component {

  @observable loginError = false;
  @observable collapseOpen = false;
  @observable loggedIn = false;



  start() {
    this.createStoreConnectedProperties({
      user: initialUser,
      userLoggedIn: false
    });
  }

  toggle() {
    this.collapseOpen = !this.collapseOpen;
  }

  usernameChange(e) {
    this.user.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.user.password = e.currentTarget.value;
  }

  login() {
    const { username, password } = this.user;

    User.findOne({ username, password }).then(user => {
      if (user) {
        // update login status
        user = { ...user, status: true };
        const currentUser = new User(user);
        currentUser.save();
        // save current user data in the store
        this.user = user;
        this.userLoggedIn = true;
        this.loginError = false;
        this.props.history.push(`/${username}`);
      } else {
        this.loginError = true;
      }
    });
  }

}