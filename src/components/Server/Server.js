import './Server.scss';
@observer export default class Server extends Component {

  @observable urlToSet = '';
  @observable projectToSet = '';


  start() {
    this.createStoreConnectedProperties({
      repo: []
    });
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
    fetch('/api/test', {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.urlToSet, projectName: this.projectToSet }), // data can be `string` or {object}!
      method: 'POST' // or 'PUT'
    })
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }





}