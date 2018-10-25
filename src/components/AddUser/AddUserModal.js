import './AddUserModal.scss';

@observer export default class AddUser extends Component {

  @observable me = {};
  @observable users = [];
  @observable filteredUsers = [];

  start() {

    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        let data = users.find(user => user._id === this.props.user._id)
        console.log(data)
      })

    // this.users = User.find({}).then((data) => {
    //   this.me = data.find(user => user._id === this.stores.Login.user._id);

    //   let friends = data.filter(user => {
    //     return user._id !== this.stores.Login.user._id;
    //   });

    //   const isIncluded = (friendId) => {
    //     return this.stores.Login.user.contact.some(id => friendId.includes(id));
    //   }
    //   this.filteredUsers = friends.filter(friend => !isIncluded(friend._id));
    // }).catch(err => console.log(err));
  }

  updateFilteredUsers(userId) {
    // remove added user in filteredUsers
    const addedUser = this.filteredUsers.find(user => user._id === userId);
    const index = this.filteredUsers.indexOf(addedUser);
    this.filteredUsers.splice(index, 1);
  }

  addContact(userId) {
    // TODO:add contact in my contact
    // this.props.user.contact.push(userId);

    // const { _id, username, contact } = this.props.user;
    // fetch(`/api/users/${_id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ _id: _id }),
    //   headers: { " Content-Type": "application/json" }
    // }).then(res => res.json())
    //   .then(data => {
    //     console.log("data", data)
    //   }).catch(err => {
    //     console.log(err);
    //   });

    this.updateFilteredUsers(userId);

    // TODO: add my id to friend contact

  }
}

