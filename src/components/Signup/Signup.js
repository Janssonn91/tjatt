import './Signup.scss';

@observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable usernameExits = false;
  @observable user = {}

  async start() {

  }

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
    //onsole.log(this.usernameToSet);
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
    //console.log(this.passWordToSet);
  }

  confirmPasswordChange(e) {
    this.confirmPassword = e.currentTarget.value;
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch('/api/newusers',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username: this.usernameToSet, password: this.passWordToSet }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(res => {
        if (res.success) {
          this.user = res.user
          this.usernameExits = false;
        } else {
          this.usernameExits = true;
        }
      });
  }

  /**
   * SUCCESS: {success: true, user: THEUSER}
   * FAIL: {success: false}
   */

  // async createUser(e){
  //   console.log(this.usernameToSet);
  //   let checkUser = await User.findOne({
  //     name : this.usernameToSet,
  //   });
  //   if(checkUser) {
  //     this.usernameExits = true;
  //     return;
  //   }
  //   console.log(checkUser);
  //   let person = await User.create({
  //       name : this.usernameToSet,
  //       password : this.passWordToSet,
  //   });
  // }

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