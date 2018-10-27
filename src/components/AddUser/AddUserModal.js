import './AddUserModal.scss';

@inject('loginStore') @observer export default class AddUser extends Component {

  @observable filteredUsers = [];

  start() {

    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        let withoutMe = users.filter(user => user._id !== this.props.loginStore.user._id)

        const isIncluded = (userId) => {
          return this.props.loginStore.user.contact.some(contactId => userId === contactId);
        }
        this.filteredUsers = withoutMe.filter(user => !isIncluded(user._id));
      });
  }

  updateFilteredUsers(userId) {
    // remove added user in filteredUsers
    const addedUser = this.filteredUsers.find(user => user._id === userId);
    const index = this.filteredUsers.indexOf(addedUser);
    this.filteredUsers.splice(index, 1);
  }

  async addContact(userId) {
    // this.props.loginStore.user.contact.push(userId);
    // add contact in my contact
    const { _id } = toJS(this.props.loginStore.user);

    await fetch(`/api/users/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ _id, contact: userId }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        res.json();
      })
      .then(() => {
        this.updateFilteredUsers(userId);
        this.props.update();
      })
      .catch(err => {
        console.log(err);
      });

    // TODO: Personen behöver godkänna ny kontakt??
    // add my id to the new friend contact
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, contact: _id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        res.json();
      })
      .catch(err => {
        console.log(err);
      });

  }
}

