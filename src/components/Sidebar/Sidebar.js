import './Sidebar.scss';

@withRouter @observer export default class Sidebar extends Component {

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
  @observable userLoggedIn;
  @observable file;
  @observable imgPath = '/images/placeholder.png'
  @observable useDBPath = !!this.props.user.image || false;
  @observable togglePWInput = false;
  @observable currentPasswordValue = '';
  @observable setNewPasswordValue = '';
  @observable confirmNewPasswordValue = '';

  // TODO: this is temporary
  @observable withoutMe = [];
  @observable filteredUsers = [];

  async start() {
    // TODO: this is temporary
    await fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        this.withoutMe = users.filter(user => user._id !== this.props.user._id);
        this.updateContact();
      })
  }

  updateContact() {
    const isIncluded = (userId) => {
      return this.props.user.contact.some(contactId => userId === contactId);
    }
    this.filteredUsers = this.withoutMe.filter(user => {
      if (isIncluded(user._id)) {
        return user.username;
      } else {
        return '';
      }
    });
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

  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen
  }

  logout() {
    fetch('/api/logout').then(() => this.props.history.go('/'))
  }

  changeLogStatus() {
    return false;
  }

  onFileChange = (event) => {
    let store = JSON.parse(localStorage.getItem('store'));
    console.log(store.Login)
    console.log(event.target.files[0])
    let formData = new FormData();
    formData.append('id', this.props.user._id);
    formData.append('file', event.target.files[0]);
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        let path = res.path;
        this.imgPath = path;
        this.useDBPath = false;
        this.toggle();
      });

  }

}