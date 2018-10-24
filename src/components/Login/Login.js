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
  @observable users = []; // TODO: need to remove after test

  start() {
    this.createStoreConnectedProperties({
      user: initialUser,
      userLoggedIn: false
    });
  }

  usernameChange(e) {
    this.user.username = e.currentTarget.value;
  }

  passwordChange(e) {
    this.user.password = e.currentTarget.value;
  }

  login() {
    const { username, password } = this.user;

    User.findOne({ username, password }).then(user => {
      if (user) {
        // update login status
        user = { ...user, status: true };
        const currentUser = new User(user);
        currentUser.save();
        // save current user data in the store
        this.user = user;
        this.userLoggedIn = true;
        this.loginError = false;
        this.props.history.push(`/${username}`);

        // test
        this.users = User.find({}).then((data) => {
          // TODO: find -> filter, friend (not this.user, not this.user.contact)
          let friend = data.find(user => {
            return user.id !== this.user.id;
          });

          if (this.user.contact.includes(friend._id)) {
            return;
          } else {
            this.user.contact.push(friend._id);
            user = { ...user, contact: this.user.contact };
            const currentUser = new User(user);
            currentUser.save();
          }

          if (friend.contact.includes(user._id)) {
            return;
          } else {
            friend.contact.push(user._id);
            const newfriend = new User(friend);
            newfriend.save();
          }
        });


      } else {
        this.loginError = true;
      }
    });
  }

}