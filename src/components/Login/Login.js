import './Login.scss';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Login extends Component {

  @observable collapseOpen = false;
  @observable username = '';
  @observable password = '';
  @observable loginError = false;


  componentDidMount() {
    this.loginError = false;
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

  checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          this.props.loginStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          socket.emit('login', this.user._id)
          socket.on('online', message => {
            this.props.loginStore.setOnLineUsers(message.loginUser);
          })
          socket.off('chat message');
          socket.on(
            'chat message',
            (messages) => {
              for (let message of messages) {
                let date = new Date();
                if (message.channel === this.props.channelStore.currentChannel._id) {
                  this.props.channelStore.channelChatHistory.push(
                    {
                      channel: message.channel,
                      sender: message.sender,
                      star: false,
                      text: message.text,
                      textType: message.textType,
                      time: date
                    }
                  )
                }
              }
            })
          socket.on('sign up', message => {
            this.props.channelStore.getUserList()
          })
          socket.on('login', message => {
            this.props.loginStore.setOnLineUsers(message.loginUser);
            // this.onLineUsers = message.loginUser; // move to store
          })
          socket.on('logout', message => {
            this.props.loginStore.setOnLineUsers(message.loginUser);
            // this.onLineUsers = message.loginUser; // move to store
          })
        }
        socket.on('message', event => {
          console.log('Message from server ', event);
        });
      }).catch(err => {
        console.log("err", err)
      })

    this.goToChat();
  }

  goToChat = async () => {
    // this.props.loginStore.pageLoad();

    // console.log(this.props.loginStore.isLoading);
    if (this.props.loginStore.isLoggedIn) {
      // this.props.loginStore.pageLoad(3000);
      this.props.history.push(`/${this.props.loginStore.user.username}`);
      this.props.channelStore.getChannels();
    }
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
          // this.user = res.user;
          // this.isLoggedIn = true;
          socket.emit("login", this.user._id)
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
    // this.props.loginStore.login(this.username, this.password);
    this.login(this.username, this.password);
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