import './Sidebar.scss';
export const imgPath = '/images/placeholder.png';

@inject('loginStore', 'channelStore') @withRouter @observer export default class Sidebar extends Component {

  @observable updateSettingModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalupdateSetting.bind(this)
  }
  @observable addUserModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalAddNewUser.bind(this)
  }
  @observable createGroupModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalCreateGroup.bind(this)
  }

  @observable collapseOpen = false;


  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openModalupdateSetting() {
    this.updateSettingModalOpen.isOpen = !this.updateSettingModalOpen.isOpen
    this.props.loginStore.savedInfo = false;
    this.props.loginStore.isNotSamePass = false;
    this.props.loginStore.currentPasswordValue = '';
    this.props.loginStore.setNewPasswordValue = '';
    this.props.loginStore.confirmNewPasswordValue = '';
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen
  }

  logout() {
    fetch('/api/logout').then(() => {
      this.props.loginStore.isLoggedIn = false;
      this.props.history.push('/');
    });
  }

  changeLogStatus() {
    return false;
  }

  changeChannel(userId, nickname) {
    this.props.channelStore.changeChannel("contact", userId);
    this.props.history.push(`/${this.props.loginStore.user.username}/${nickname}`);
  }

}