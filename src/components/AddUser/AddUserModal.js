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

  addContact(userId) {
    // add contact in my contact
    this.me.contact.push(userId);
    const currentUser = new User(this.me);
    currentUser.save();
    this.updateFilteredUsers(userId);

    // TODO: add my id to friend contact

  }
}

        // this.stores.Login.user.contact.forEach(person => {
        //   return friends.forEach(friend => {
        //     if (friend._id === person._id) {
        //       return;
        //     } else {
        //       this.stores.Login.user.contact.push(friend._id);
        //       user = { ...user, contact: this.stores.Login.user.contact };
        //       const currentUser = new User(user);
        //       currentUser.save();
        //     }
        //   });
        // })

