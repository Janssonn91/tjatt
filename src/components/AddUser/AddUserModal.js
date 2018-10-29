import './AddUserModal.scss';

@inject('loginStore') @observer export default class AddUser extends Component {

  start() {
    this.props.loginStore.fetchContact();
  }

}

