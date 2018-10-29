import './Signup.scss';

@inject('loginStore', 'channelStore') @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  passwordChange(e) {
    this.passWordToSet = e.currentTarget.value;
  }

  confirmPasswordChange = (e) => {
    this.confirmPassword = e.currentTarget.value;
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginStore.signUp(this.usernameToSet, this.passWordToSet);
  };

}