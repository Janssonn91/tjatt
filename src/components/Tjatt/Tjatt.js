import './Tjatt.scss';
@inject('userStore', 'channelStore', 'applicationStateStore') @withRouter @observer
export default class Tjatt extends Component {
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable sendToMenu = this.showChat.bind(this);


  async start() {
    this.props.channelStore.getChannelList();
    this.props.channelStore.getUserList();
    this.props.userStore.fetchContact();
    this.props.applicationStateStore.setSystemInfo();
    this.props.userStore.fetchStars();
    await sleep(600);
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