@withRouter @observer export default class AddUser extends Component {

  @observable addUserModalOpen = false;
  start(){
  }
  toggle() {
    this.addUserModalOpen = !this.addUserModalOpen;
    console.log(this.addUserModalOpen, "addUserModalOpen");
    console.log(this.props);
  }

}