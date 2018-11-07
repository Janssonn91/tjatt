import './AddUserModal.scss';

@inject('loginStore', 'channelStore') @observer export default class AddUser extends Component {

  async start() {
    this.props.loginStore.fetchContact();
  }

  addContact(userId){
    this.props.loginStore.addContact(userId);
    this.props.toggle();
  }

}

