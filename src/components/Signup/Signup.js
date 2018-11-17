import './Signup.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable useremailToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable passwordsDontMatch = false;
  @observable validEmail = true;
  @observable usernameExits = false;

  // olika meddelande om det är dublett på mail eller user

  componentDidMount() {
    this.props.loginStore.emailExist = false;
  }

  usernameChange(e) {
    this.usernameToSet = e.currentTarget.value;
  }

  useremailChange(e) {
    this.useremailToSet = e.currentTarget.value;
    this.validateEmail();
  }

  validateEmail() {
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

  removeError = (e) => {
    this.props.loginStore.usernameExist = false;
  }

  removeEmailError = (e) => {
    this.props.loginStore.emailExist = false;
    this.usernameExits = false;
  }

  sendWelcomeMail(username, email) {
    fetch('/api/send-mail', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('mail skickat')
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  signUp(username, password, useremail) {
    fetch('/api/users',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, password, useremail }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('created user: ' + username + ' med mail ' + useremail)
          this.props.loginStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          this.props.history.push(`/${this.props.loginStore.user.username}`);
          this.usernameExits = false;
          this.sendWelcomeMail(username, useremail);
          socket.emit('sign up', this.user);
        } else {
          console.log('träff');
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.signUp(this.usernameToSet, this.passWordToSet, this.useremailToSet);
  };

}