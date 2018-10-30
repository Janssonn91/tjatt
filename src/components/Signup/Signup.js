import './Signup.scss';

@withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable useremailToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable usernameExits = false;
  @observable user = {};

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

  onSubmit = (e) => {
    let newUser = {
      username: document.getElementById('username').value,
      useremail: document.getElementById('useremail').value,
      password: document.getElementById('userpassword').value
    };
    console.log(newUser);
    e.preventDefault();
    fetch('/api/users', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username: newUser.username , useremail: newUser.useremail, password: newUser.password }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('created user: ' + this.usernameToSet)
          this.user = res.user
          this.usernameExits = false;
          this.props.history.push('/');
          this.sendWelcomeMail(this.user);
        } else {
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  };

  sendWelcomeMail(user){
      console.log(toJS(user));
      fetch('/api/send-mail', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify( {username: user.username, email: user.email} ),
        headers: { 'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('här din get');
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

}