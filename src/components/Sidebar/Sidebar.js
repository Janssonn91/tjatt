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
    toggle: this.closeModal.bind(this)
  }

  @observable collapseOpen = false;
  @observable contactsOpen = false;
  @observable groupsOpen = false;

  start() {
    // this.props.channelStore.getChannels();
  }


  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openContacts = () => {
    this.contactsOpen = !this.contactsOpen;
  }

  openGroups = () => {
    this.groupsOpen = !this.groupsOpen;
  }

  openModalupdateSetting() {
    this.updateSettingModalOpen.isOpen = !this.updateSettingModalOpen.isOpen
    this.props.loginStore.resetAlert();
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;

  }

  closeModal() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;
    this.props.loginStore.cleanUpGroupModal();
  }

  logout() {
    fetch('/api/logout').then(() => {
      this.props.loginStore.isLoggedIn = false;
      this.props.channelStore.resetCurrentChannel();
      this.props.history.push('/');
      socket.emit("logout", this.props.loginStore.user._id);
    });
  }

  changeLogStatus() {
    return false;
  }

  changeChannel(channel) {
    this.props.channelStore.changeChannel(channel);
    this.props.history.push(`/${this.props.loginStore.user.username}/${channel.channelname}`);
  }

}