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
    console.log(this.me);
    this.me.contact.push(userId);
    // const newContact =
    console.log(toJS(this.me.contact))
    this.me = { ...this.me, contact: toJS(this.me.contact) };
    const currentUser = new User(this.me);
    currentUser.save();

    // friend.contact.push(user._id);
    // const newfriend = new User(friend);
    // newfriend.save();
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

