import './AddUserModal.scss';

@inject('loginStore', 'userStore', 'channelStore') @observer export default class AddUser extends Component {

  @observable candidates = [];
  @observable searchedCandidates = [];

  start() {
    this.fetchContact();
  }

  fetchContact() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const withoutMe = users.filter(user => user._id !== this.props.loginStore.user._id);

        const isIncluded = (userId) => {
          return this.props.loginStore.user.contact.some(contactId => userId === contactId);
        }
        this.candidates = withoutMe.filter(user => !isIncluded(user._id)); //use in AddUserModal
        const myContacts = withoutMe.filter(user => isIncluded(user._id)); //use in Sidebar => save in user-store
        const groupCandidates = withoutMe.filter(user => isIncluded(user._id)); //use in CreateGroupModal => save in user-store

        this.props.userStore.setMyContactsAndGroupCandidates(myContacts, groupCandidates);
      });
  }

  searchCandidates = (e) => {
    this.searchedCandidates = [];
    if (!e.target.value) {
      return this.searchedCandidates = [];
    }
    const regex = new RegExp(e.target.value, 'i');
    this.searchedCandidates = this.candidates.filter(user => {
      return regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email);
    })
  }

  userWasClicked = (userId) => {
    this.searchedCandidates = this.searchedCandidates.filter(user => user._id !== userId);
  }

  // remove added user in candidates
  async updateContact(userId) {
    const addedUser = await this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);

    this.props.userStore.updateMyContactsAndGroupCandidates(addedUser);
    this.props.channelStore.renderChannelElements(this.props.channelStore.contactChannels, 'contact', 'contactsRender');
  }

  async addContact(userId) {
    this.userWasClicked(userId);

    const { user } = this.props.loginStore;

    const channelname = user._id + " and " + userId;
    const admin = [user._id, userId];
    const members = [user._id, userId];

    this.props.channelStore.createChannel(channelname, admin, members, false);
    await sleep(60);
    Channel.find({ channelname: channelname }).then(channel => {
      socket.emit('join channel', channel[0]._id)
      this.props.channelStore.updateContactChannels(channel[0]);

      // add contact in my contact
      fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: user._id, contact: userId, channel: channel[0]._id
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(() => {
          this.updateContact(userId);
        })
        .catch(err => {
          console.log(err);
        });

      // add my id to the new friend contact
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

