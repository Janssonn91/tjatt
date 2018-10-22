import './Signup.scss';

@observer export default class Signup extends Component {

  usernameToSet;
  passWordToSet;
  confirmPasswordToSet;
  @observable usernameExits = false;
  @observable passwordMissing = false;
  @observable passwordsNotMacthing = false;
  @observable usernameMissing = false;
  @observable passwordMissing = false;

  async start() {

  }

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  confirmPasswordChange(e) {
    this.confirmPasswordToSet = e.currentTarget.value;
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

  async checkUserInput() {
    
    if(!this.usernameToSet || !this.passWordToSet) {
      if(!this.usernameToSet){
        this.usernameMissing = true;
        return;
      }
      else if(!this.passWordToSet){
        this.passwordMissing = true;
        return;
      }
    }
    if(!this.passWordToSet){
      this.passwordMissing = true;
      return;
    }
    if(this.passWordToSet !== this.confirmPasswordToSet){
      this.passwordsNotMacthing = true;
      return;
    }
    
    let checkUser = await User.findOne({
      username: this.usernameToSet
    });
    if (checkUser) {
      this.usernameExits = true;
      return;
    }
    this.createUser();
  }

  async createUser() {
    
    await User.create({
      id: this.generateUuid(),
      username: this.usernameToSet,
      password: this.passWordToSet,
      nickname: this.usernameToSet,
      image: '',
      status: true,
      date: new Date(),
      group: [],
      contact: []
    }).then((person) => {
      console.log(`${person.username} created`);
    });
    document.getElementById("crete-account-form").reset();
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