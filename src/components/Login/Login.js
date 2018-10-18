import './Login.scss';
@observer export default class Login extends Component {

  //Temporary for controlling logged in state
  @observable userLoggedIn;

  async start() {

    this.createStoreConnectedProperties({
      username: '',
      password: ''
    });
  }

  usernameChange(e){
      this.usernameToSet = e.currentTarget.value;
      console.log(this.usernameToSet);
  }

  passwordChange(e){
      this.passWordToSet = e.currentTarget.value;
      console.log(this.passWordToSet);
  }

  saveName(){
    console.log('träff');
    this.userLoggedIn = true;
  }

  logout(){
    this.userLoggedIn = false;
  }

  

}