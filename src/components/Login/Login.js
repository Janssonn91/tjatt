import './Login.scss';

@withRouter @observer export default class Login extends Component {

  @observable loginError = false;
  @observable collapseOpen = false;
  @observable loggedIn = false;
  @observable username = '';
  @observable password = '';
  @observable user = {};

  componentWillMount() {
    this.checkIfLoggedIn();
  }

  toggle() {
    this.collapseOpen = !this.collapseOpen;
  }

  usernameChange(e) {
    this.username = e.currentTarget.value;
    console.log(this.username);
  }

  passwordChange(e) {
    this.password = e.currentTarget.value;
  }

  checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          this.user = res.user;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  onSubmit = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username: this.username, password: this.password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.user = res.user;
        }
        else {
          this.loginError = true;
        }
      }).catch(err => {
        console.log("err", err)
      })
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