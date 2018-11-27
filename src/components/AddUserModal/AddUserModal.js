import './AddUserModal.scss';

@inject('userStore', 'channelStore') @observer export default class AddUser extends Component {

  @observable searchedCandidates = [];


  async start() {
    await sleep(10);
    // Show all candidates from beginning
    this.searchedCandidates = this.props.userStore.candidates;
  }

  searchCandidates = (e) => {
    this.searchedCandidates = [];
    if (!e.target.value) {
      // Show all candidates if input value is empty
      return this.searchedCandidates = this.props.userStore.candidates;
    }
    const regex = new RegExp(e.target.value, 'i');
    this.searchedCandidates = this.props.userStore.candidates.filter(user => {
      return regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email);
    })
  }

  // remove added user in candidates in view
  userWasClicked = (userId) => {
    this.searchedCandidates = this.searchedCandidates.filter(user => user._id !== userId);
  }

  async addContact(userId) {
    this.userWasClicked(userId);

    const { user } = this.props.userStore;

    const channelname = user._id + " and " + userId;
    const admin = [user._id, userId];
    const members = [user._id, userId];

    this.props.channelStore.createChannel(channelname, admin, members, false, false);
    await sleep(60);
    Channel.find({ channelname: channelname }).then(channel => {
      socket.emit('system', {newChannel: channel[0], invitee: userId, inviter: user._id, type:"inviation"})
      this.props.channelStore.updateContactChannels(channel[0]);

      // add contact into my contact
      fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: user._id, contact: userId, channel: channel[0]._id
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(() => {
          // remove added user in candidates and add the user in myContacts in user-store
          this.props.userStore.updateMyContact(userId);
        })
        .catch(err => {
          console.log(err);
        });

      // add my id into the new friend contact
      fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ userId, contact: user._id, channel: channel[0]._id }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
    });
  }

}

