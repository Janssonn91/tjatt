import './AddUserModal.scss';

@observer export default class AddUser extends Component {

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