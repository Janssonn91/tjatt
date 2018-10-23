@withRouter @observer  export default class Tjatt extends Component {

  @observable hideMenu = true;
  @observable hideChat = false;
  @observable sendToChat = this.showMenu.bind(this);
  @observable sendToMenu = this.showChat.bind(this);

  showMenu(){
    this.hideMenu = false;
    this.hideChat = true;
  }

  showChat(){
    this.hideMenu = true;
    this.hideChat = false;
  }

}

