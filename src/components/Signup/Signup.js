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

  generateUuid() {
    const chars = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".split("");

    for (let i = 0, len = chars.length; i < len; i++) {
      if (chars[i] === "x") {
        chars[i] = Math.floor(Math.random() * 16).toString(16);
      }
    }
    return chars.join("");
  }

  async createUser(e) {
    let checkUser = await User.findOne({
      username: this.usernameToSet,
    });
    if (checkUser) {
      this.usernameExits = true;
      return;
    }

    await User.create({
      id: this.generateUuid(),
      username: this.usernameToSet,
      password: this.passWordToSet,
      nickname: '',
      image: '',
      status: true,
      date: new Date(),
      group: [],
      contact: []
    }).then((person) => {
      console.log(`${person.username} created`);
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