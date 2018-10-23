import './Sidebar.scss';
import { initialUser } from '../Login/Login';

@withRouter @observer export default class Sidebar extends Component {
  async start() { }

  @observable collapseOpen = false;
  @observable userLoggedIn;
  @observable test;
  @observable file;
  @observable imgPath = '/images/placeholder.png'

  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
    console.log("körs");
  }

  logout() {
    // update login status in MongoDB
    this.stores.Login.user = { ...this.stores.Login.user, status: false };
    // update login status in the store
    this.stores.Login.userLoggedIn = false;
    this.stores.Login.user = initialUser;
    this.props.history.push('/');
  }

  changeLogStatus() {
    return false;
  }

  onFileChange = (event) => {
    let store = JSON.parse(localStorage.getItem('store'));
    console.log(store.Login)
    console.log(event.target.files[0])
    let formData = new FormData();
    formData.append('id', store.Login.user.id);
    formData.append('file', event.target.files[0]);
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        let path = res.path;
        this.imgPath = path.split('public')[1];
        console.log('Image uploaded to ' + store.Login.user.username)
      });

  }

}