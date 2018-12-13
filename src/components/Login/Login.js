import './Login.scss';

@inject('userStore', 'channelStore', 'applicationStateStore') @withRouter @observer export default class Login extends Component {

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
          console.log("login user", res)
          this.props.userStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          this.props.userStore.fetchContact();
          this.props.applicationStateStore.checkIfLoggedIn();
          this.props.history.push(`/${this.props.userStore.user.username}/info`);
          socket.emit("login", this.props.userStore.user._id);

          fetch('/api/system').then(res => res.json()).then(data=>{
            this.props.applicationStateStore.systemChannel = data.systemChannel;
            console.log("systemChannel",this.props.applicationStateStore.systemChannel)
            
            this.props.applicationStateStore.systemId = data.systemUserId;
            console.log("systemId", this.props.applicationStateStore.systemId);
            socket.emit('online', res.user._id)
            //this.props.channelStore.getUserList();
          }).catch(err=>console.log(err))
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
}
