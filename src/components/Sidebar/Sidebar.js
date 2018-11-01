import './Sidebar.scss';

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
  @observable file;
  @observable imgPath = '/images/placeholder.png'
  @observable useDBPath = !!this.props.loginStore.user.image || false;
  @observable togglePWInput = false;
  @observable currentPasswordValue = '';
  @observable setNewPasswordValue = '';
  @observable confirmNewPasswordValue = '';

  // start(){
  //   this.props.channelStore.getChannels();
  // }

  async start() {
  }

  changePW() {
    this.togglePWInput = !this.togglePWInput;
    this.toggle();
  }

  currentPassword(e) {
    this.currentPasswordValue = e.currentTarget.value;
  }

  setNewPassword(e) {
    this.setNewPasswordValue = e.currentTarget.value;
  }

  confirmNewPassword(e) {
    this.confirmNewPasswordValue = e.currentTarget.value;
  }
  @observable imgPath = '/images/placeholder.png';

  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openModalupdateSetting() {
    this.updateSettingModalOpen.isOpen = !this.updateSettingModalOpen.isOpen
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen
  }

  logout() {
    fetch('/api/logout').then(() => this.props.history.go('/'));
  }

  changeLogStatus() {
    return false;
  }

}