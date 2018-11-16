import './ChatMessage.scss';

@inject('loginStore', 'channelStore') @observer
export default class ChatMessage extends Component {

  @observable iconShow = false;
  @observable iconDisappear = false;
  @observable isOpen = false;
  @observable dropdownOpen = false;
  @observable deleteMessageModal = false;

  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this),
    messageId: this.deleteMessageModalToggle.bind(this)
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  deleteMessageModalToggle(messageId) {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen;
    this.sendToDeleteMessageModal.messageId = messageId;
  }

}