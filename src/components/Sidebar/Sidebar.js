import './Sidebar.scss';

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
    console.log(this.props);
    this.props.logout(this.changeLogStatus.bind(this));
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