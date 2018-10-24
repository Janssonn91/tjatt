import './Sidebar.scss';
import { initialUser } from '../Login/Login';

@withRouter @observer export default class Sidebar extends Component {
  async start() {}

  @observable addUserModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalAddNewUser.bind(this)
  }
  @observable collapseOpen = false;
  @observable userLoggedIn;
  @observable file;
  @observable imgPath = '/images/placeholder.png'
  @observable useDBPath = !!this.props.user.image || false;

  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  logout() {
    // // update login status in MongoDB
    // this.stores.Login.user = { ...this.stores.Login.user, status: false };
    // // update login status in the store
    // this.stores.Login.userLoggedIn = false;
    // this.stores.Login.user = initialUser;
    // this.props.history.push('/');
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
      });

  }

}