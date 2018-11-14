import './Login.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Login extends Component {

  @observable collapseOpen = false;
  @observable username = '';
  @observable password = '';


  componentDidMount() {
    this.props.loginStore.loginError = false;
    this.checkIfLoggedIn();

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

  // checkIfLoggedIn() {
  //   this.props.loginStore.checkIfLoggedIn();
  // }
  checkIfLoggedIn() {
    this.props.loginStore.checkIfLoggedIn();
    this.goToChat();
  }

  goToChat = async () => {
    await sleep(60);

    // console.log(this.props.loginStore.isLoading);
    if (this.props.loginStore.isLoggedIn) {
      // this.props.loginStore.pageLoad(3000);
      this.props.history.push(`/${this.props.loginStore.user.username}`);
      //this.props.channelStore.getChannels();
      //this.props.loginStore.checkIfLoggedIn();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginStore.login(this.username, this.password);
    this.goToChat();

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