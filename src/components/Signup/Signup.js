import './Signup.scss';

@observer export default class Signup extends Component {

  usernameToSet;
  passWordToSet;
  @observable usernameExits = false;

  async start() {
    
  }

  usernameChange(e){
    this.usernameToSet = e.currentTarget.value;
    //onsole.log(this.usernameToSet);
  }

  passwordChange(e){
    this.passWordToSet = e.currentTarget.value;
    //console.log(this.passWordToSet);
  }

  async createUser(e){
    console.log(this.usernameToSet);
    let checkUser = await User.findOne({
      name : this.usernameToSet,
    });
    if(checkUser) {
      this.usernameExits = true;
      return;
    }
    console.log(checkUser);
    let person = await User.create({
        name : this.usernameToSet,
        password : this.passWordToSet,
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