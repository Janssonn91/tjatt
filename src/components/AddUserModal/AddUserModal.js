import './AddUserModal.scss';

@inject('loginStore', 'channelStore') @observer export default class AddUser extends Component {

  @observable userCandidates = [];

  start() {
    this.props.loginStore.fetchContact()
    // .then(() => {
    //   this.userCandidates = this.props.loginStore.candidates;
    // })
  }

  searchCandidates = (e) => {
    this.userCandidates = [];
    if (!e.target.value) {
      return this.userCandidates = [];
    }
    const regex = new RegExp(e.target.value, 'i');
    const result = this.props.loginStore.candidates.filter(user => {
      if (regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email)) {
        return this.userCandidates.push(user);
      }
      return null;
    })
  }

  userWasClicked = (userId) => {
    this.userCandidates = this.userCandidates.filter(user => user._id !== userId)
    console.log(toJS(this.userCandidates));
  }

  addContact(userId) {
    this.props.loginStore.addContact(userId);
    this.props.toggle();
  }

}

