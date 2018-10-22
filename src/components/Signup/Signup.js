import './Signup.scss';

@observer export default class Signup extends Component {

  usernameToSet;
  passWordToSet;
  @observable usernameExits = false;

  async start() {

  }

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  async createUser(e) {
    console.log(this.usernameToSet);
    let checkUser = await User.findOne({
      username: this.usernameToSet,
    });
    if (checkUser) {
      this.usernameExits = true;
      return;
    }
    console.log(checkUser);
    let person = await User.create({
      username: this.usernameToSet,
      password: this.passWordToSet,
    });
  }

  /*login() {
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
  }*/

}