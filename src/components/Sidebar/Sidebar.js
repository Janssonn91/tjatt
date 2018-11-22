import './Sidebar.scss';
export const imgPath = '/images/placeholder.png';

@inject('userStore', 'channelStore') @withRouter @observer export default class Sidebar extends Component {

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

  @observable deleteContactModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalDeleteContact.bind(this),
    channelName: this.props.match.params.id,
  }

  @observable collapseOpen = false;
  @observable contactsOpen = false;
  @observable groupsOpen = false;

  start() {
    console.log(this.props.match.params.id)
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
    this.updateSettingModalOpen.isOpen = !this.updateSettingModalOpen.isOpen;
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;
  }

  closeModal() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;
    this.props.userStore.cleanUpGroupModal();
  }

  openModalDeleteContact() {
    this.deleteContactModalOpen.isOpen = !this.deleteContactModalOpen.isOpen;
  }

  logout() {
    fetch('/api/logout').then(() => {
      this.props.channelStore.resetCurrentChannel();
      this.props.userStore.logout(); // set isLoggedIn false
      this.props.history.push('/');
      socket.emit("logout", this.props.userStore.user._id);
    });
  }

  changeLogStatus() {
    return false;
  }

}