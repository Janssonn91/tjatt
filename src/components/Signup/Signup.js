import './Signup.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable useremailToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  useremailChange(e) {
    this.useremailToSet = e.currentTarget.value;
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  confirmPasswordChange = (e) => {
    this.confirmPassword = e.currentTarget.value;
    // behöver email-validering här och sök på om den redan finns i backend?
  }

  goToChat = async () => {
    await sleep(30);
    if (this.props.loginStore.isLoggedIn) {
      this.props.history.push(`/${this.props.loginStore.user.username}`);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginStore.signUp(this.usernameToSet, this.passWordToSet, this.useremailToSet);
    this.goToChat();
  };

}