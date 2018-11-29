import './ChatMessage.scss';

@inject('userStore', 'channelStore') @observer
export default class ChatMessage extends Component {

  @observable iconShow = false;
  @observable iconDisappear = false;
  @observable isOpen = false;
  @observable dropdownOpen = false;
  @observable deleteMessageModal = false;
  @observable chatImageModal = false;
  @observable currentImage = '';
  @observable originalName = '';
  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this)
  }

  start() { }

  toggleChatModal = () => {
    this.chatImageModal = !this.chatImageModal;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  deleteMessageModalToggle() {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen
  }


}