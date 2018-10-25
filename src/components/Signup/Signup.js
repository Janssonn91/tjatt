import './Signup.scss';

@withRouter @observer export default class Signup extends Component {

  @observable usernameToSet = '';
  @observable passWordToSet = '';
  @observable confirmPassword = '';
  @observable usernameExits = false;
  @observable user = {};

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
          setTimeout(() => {
            this.props.history.push('/');
          }, 5000);

        } else {
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  };

}