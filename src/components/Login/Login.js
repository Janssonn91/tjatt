import './Login.scss';

export const initialUser = {
  id: '',
  username: '',
  password: '',
  nickname: '',
  image: '',
  status: false,
  date: 0,
  group: [],
  contact: []
};

@withRouter @observer export default class Login extends Component {

  @observable loginError = false;
  @observable collapseOpen = false;
  @observable loggedIn = false;
  @observable username = '';
  @observable password = '';
  @observable user = {};



  start() {
    // this.createStoreConnectedProperties({
    //   user: initialUser,
    //   //userLoggedIn: false
    // });
    // console.log(this.userLoggedIn)
  }

  componentWillMount() {
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
          this.user = res.user;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  onSubmit = (e) => {
    console.log('dasdasd')
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
          // this.userLoggedIn = true;
          // console.log(this.userLoggedIn + 'logged in as: ' + this.user.username)
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  // login() {
  //   const { username, password } = this.user;

  //   User.findOne({ username, password }).then(user => {
  //     if (user) {
  //       // update login status
  //       user = { ...user, status: true };
  //       const currentUser = new User(user);
  //       currentUser.save();
  //       // save current user data in the store
  //       this.user = user;
  //       this.userLoggedIn = true;
  //       this.loginError = false;
  //       this.props.history.push(`/${username}`);
  //     } else {
  //       this.loginError = true;
  //     }
  //   });
  // }

}