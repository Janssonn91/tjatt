@inject('loginStore', 'channelStore') @withRouter @observer
export default class Tjatt extends Component {
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable sendToMenu = this.showChat.bind(this);


  start() {
    this.props.channelStore.getUserList();
    //this.props.channelStore.getChannels();
  }

  showMenu() {
    this.hideMenu = false;
    this.hideChat = true;
  }

  showChat() {
    this.hideMenu = true;
    this.hideChat = false;
  }



  // @observable sendToChat = this.showMenu.bind(this);








}