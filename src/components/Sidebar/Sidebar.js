import './Sidebar.scss';

@withRouter @observer export default class Sidebar extends Component {
  async start() {}

  @observable collapseOpen = false;
 
  toggle(){
    this.collapseOpen = !this.collapseOpen;
    console.log("körs");
  }

}