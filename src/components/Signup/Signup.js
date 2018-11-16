import './Signup.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable useremailToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable passwordsDontMatch = false;
  @observable validEmail = true;

  // olika meddelande om det är dublett på mail eller user

  componentDidMount() {
    this.props.loginStore.usernameExist = false;
    this.props.loginStore.emailExist = false;
  }

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  useremailChange(e) {
    this.useremailToSet = e.currentTarget.value;
    this.validateEmail();
  }

  validateEmail(){
    this.validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.useremailToSet);
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  confirmPasswordChange = (e) => {
    this.confirmPassword = e.currentTarget.value;
    this.checkPasswordsMatch();
  }

  checkPasswordsMatch = () => {
    if (this.passWordToSet === this.confirmPassword) {
      this.passwordsDontMatch = false;
    } else {
      this.passwordsDontMatch = true;
    }
  }

  goToChat = async () => {
    await sleep(30);
    if (this.props.loginStore.isLoggedIn) {
      this.props.history.push(`/${this.props.loginStore.user.username}`);
    }
  }

  removeError = (e) => {
    this.props.loginStore.usernameExist = false;
  }

  removeEmailError = (e) => {
    this.props.loginStore.emailExist = false;
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginStore.signUp(this.usernameToSet, this.passWordToSet, this.useremailToSet);
    this.goToChat();
  };

}