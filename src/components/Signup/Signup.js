import './Signup.scss';

@inject('userStore', 'channelStore') @withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable useremailToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable passwordsDontMatch = false;
  @observable validEmail = true;
  @observable usernameExist = false;
  @observable emailExist = false;

  // olika meddelande om det är dublett på mail eller user

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
    this.usernameExist = false;
  }

  removeEmailError = (e) => {
    this.emailExist = false;
    this.usernameExist = false;
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
        console.log("resssssss",res)
        if (res.success) {
          console.log('created user: ' + username + ' med mail ' + useremail)
          this.props.userStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          this.props.userStore.fetchContact();
          this.props.history.push(`/${this.props.userStore.user.username}`);
          this.usernameExist = false;
          this.sendWelcomeMail(username, useremail);
          socket.emit('sign up', this.user);
        } else {
          console.log('träff');
          this.usernameExist = true;
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