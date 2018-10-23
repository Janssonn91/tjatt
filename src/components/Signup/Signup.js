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
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  confirmPasswordChange = (e) => {
    this.confirmPassword = e.currentTarget.value;
  }

  // generateUuid() {
  //   const chars = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".split("");

  //   for (let i = 0, len = chars.length; i < len; i++) {
  //     if (chars[i] === "x") {
  //       chars[i] = Math.floor(Math.random() * 16).toString(16);
  //     }
  //   }
  //   return chars.join("");
  // }

  // async createUser(e) {
  //   let checkUser = await User.findOne({
  //     username: this.usernameToSet,
  //   });
  //   if (checkUser) {
  //     this.usernameExits = true;
  //     return;
  //   }

  //   await User.create({
  //     id: this.generateUuid(),
  //     username: this.usernameToSet,
  //     password: this.passWordToSet,
  //     nickname: '',
  //     image: '',
  //     status: true,
  //     date: new Date(),
  //     group: [],
  //     contact: []
  //   }).then((person) => {
  //     console.log(`${person.username} created`);
  //   });



  onSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username: this.usernameToSet, password: this.passWordToSet }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('created user: ' + this.usernameToSet)
          this.user = res.user
          this.usernameExits = false;
        } else {
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  };


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