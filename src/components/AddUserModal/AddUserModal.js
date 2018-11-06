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
    let regex = new RegExp(e.target.value, 'i');
    let result = this.props.loginStore.candidates.filter(user => {
      if (regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email)) {
        this.userCandidates.push(user);
      }
    })
  }

  userWasClicked = (userId) => {
    this.userCandidates = this.userCandidates.filter(user => user._id !== userId)
  }

}

