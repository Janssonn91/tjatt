import './Server.scss';
@observer export default class Server extends Component {

  @observable urlToSet = '';
  @observable projectToSet = '';
  @observable repos = [];
  @observable isOpen = false;



  start() {
    this.createStoreConnectedProperties({
      repo: []
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  addRepo(name, url) {
    console.log('adding to mongo');
    Repo.create({
      name: name,
      url: url,
      port: "Strargawrgwing",
    })
  }
  editText(e) {
    this.urlToSet = e.currentTarget.value;
  }

  editProjectName(e) {
    this.projectToSet = e.currentTarget.value;

  }

  checkForEnter(e) {
    if (e.key === 'Enter') {
      this.submit()
    }
  }

  submit = () => {
    console.log(this.urlToSet)
    fetch('/api/addRepo', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.urlToSet, projectName: this.projectToSet }), // data can be `string` or {object}!
      method: 'POST' // or 'PUT'
    })
    this.addRepo(this.projectToSet, this.urlToSet)
  }





}