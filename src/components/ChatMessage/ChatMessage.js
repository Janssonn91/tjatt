import './ChatMessage.scss';
import Highlight from 'react-highlight';
import ScrollableFeed from 'react-scrollable-feed';
import 'highlight.js/styles/vs2015.css';
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
  @observable fullHeightSnippet = [];
  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this)
  }

  async start() {

  }

  toggleSnippetHeight = (index) => {
    if (this.fullHeightSnippet.some(obj => obj.index === index)) {
      let scroll = document.querySelector('._scrollable-div_1dj6m_1');
      let objIndex = this.fullHeightSnippet.findIndex(obj => obj.index === index);
      scroll.scrollTop = this.fullHeightSnippet[objIndex].scroll;
      this.fullHeightSnippet = this.fullHeightSnippet.filter(x => x.index !== index);

    } else {
      let scroll = document.querySelector('._scrollable-div_1dj6m_1').scrollTop;
      console.log(scroll, { index, scroll })
      this.fullHeightSnippet.push({ index, scroll });
    }
    console.log(this.fullHeightSnippet);
  }

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

  formattedTime(t) {
    t = new Date(t);
    let result = "";
    let today = new Date();
    let hour = t.getHours();
    let min = t.getMinutes();
    let ampm = hour >= 12 ? "AM" : "PM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    if (today.setHours(0, 0, 0, 0) === t.setHours(0, 0, 0, 0)) {
      result += hour + ":" + min + " " + ampm + " Today";
      return result;
    } else {
      result += t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()
        + " " + hour + ":" + min + " " + ampm;
      return result;
    }


  }

}