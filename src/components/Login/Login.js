import './Login.scss';
@observer export default class Login extends Component {

  //Temporary for controlling logged in state
  @observable userLoggedIn = false;

  async start() {

    this.createStoreConnectedProperties({
      username: '',
      password: ''
    });

    // test
    this.users = await User.find({});
    console.log(this.users);
  }

  usernameChange(e) {
    this.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.password = e.currentTarget.value;
  }

  saveName() {
    const isUser = this.users.some(user => {
      return user.name === this.usernameToSet && user.password === this.passWordToSet;
    })
    if (isUser) {
    console.log('this.userLoggedIn');
    this.userLoggedIn = true;
  }
    this.logginError = true;
  }
  
}