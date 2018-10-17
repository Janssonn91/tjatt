import './Login.scss';
export default class Login extends Component {
  async start() {
    this.createStoreConnectedProperties({
      username: '',
      password: ''
    });
  }

  usernameChange(e){
      this.usernameToSet = e.currentTarget.value;
      console.log(this.usernameChange);
  }

  passwordChange(e){
      this.passWordToSet = e.currentTarget.value;
      console.log(this.passWordToSet);
  }


}