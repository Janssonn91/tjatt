import './Login.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Login extends Component {

  @observable collapseOpen = false;
  @observable username = '';
  @observable password = '';
  @observable loginError = false;


  componentDidMount() {
    this.loginError = false;
  }

  toggle() {
    this.collapseOpen = !this.collapseOpen;
  }

  usernameChange(e) {
    this.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.password = e.currentTarget.value;
  }

  goToChat = () => {
    this.props.loginStore.isLoggedIn && this.props.history.push(`/${this.props.loginStore.user.username}`);
    this.props.channelStore.getChannels();
  }

  login(username, password) {
    fetch('/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.loginStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          socket.emit("login", this.props.loginStore.user._id);
          this.goToChat();
        }
        else {
          this.loginError = true;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.login(this.username, this.password);
    document.getElementById('password').value = '';
    document.getElementById('username').value = '';
    this.username = '';
    this.password = '';

  }




  // måste göra ny route för detta, denna är tagen av signup nu!
  // länk är satt som d-none i login.jsx nu!
  /*
  retrievePassword = (e) => {
    e.preventDefault();
    let test = {
      username: 'Pelle Plutt',
      email: 'hejdinget@get.nu'
    }
    console.log(test.username,test.email);
    fetch('/api/send-mail', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify( {username: test.username, email: test.email} ),
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
  */

}




/*
url: `/send-mail`,
        method: 'POST',
        data: JSON.stringify(body),
        dataType: 'json',
        processData: false,
        contentType: "application/json; charset=utf-8"
        */