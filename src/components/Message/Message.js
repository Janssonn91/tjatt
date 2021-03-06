import './Message.scss';

@inject('userStore', 'channelStore') @observer
export default class Message extends Component {

  @observable isOpen = false;
  @observable deleteMessageModal = false;

  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this)
  }

  async start() { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  deleteMessageModalToggle() {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen
  }

}