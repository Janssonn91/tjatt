import './AddUserModal.scss';

@inject('loginStore', 'channelStore')  @observer export default class AddUser extends Component {

  start() {
    this.props.loginStore.fetchContact();
  }

}

