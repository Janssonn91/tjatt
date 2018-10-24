import './AddUserModal.scss';

@observer export default class AddUser extends Component {

  @observable me = {};
  @observable users = [];
  @observable filteredUsers = [];

  start() {
    this.users = User.find({}).then((data) => {
      this.me = data.find(user => user.id === this.stores.Login.user.id);

      let friends = data.filter(user => {
        return user.id !== this.stores.Login.user.id;
      });

      const isIncluded = (friendId) => {
        return this.stores.Login.user.contact.some(id => friendId.includes(id));
      }
      this.filteredUsers = friends.filter(friend => !isIncluded(friend._id));
    });
  }

  updateFilteredUsers(userId) {
    // remove added user in filteredUsers
    const addedUser = this.filteredUsers.find(user => user._id === userId);
    const index = this.filteredUsers.indexOf(addedUser);
    this.filteredUsers.splice(index, 1);
  }

  addContact(userId) {
    // add contact in my contact
    this.me.contact.push(userId);
    const currentUser = new User(this.me);
    currentUser.save();
    this.updateFilteredUsers(userId);

    // TODO: add my id to friend contact

  }
}

