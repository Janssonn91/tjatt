import './ChatMessage.scss';

@inject('loginStore', 'channelStore') @observer
export default class ChatMessage extends Component {
 
  @observable isOpen = false;
  @observable deleteMessageModal = false;

  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this)
  }

  async start() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  deleteMessageModalToggle() {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen
  }

}