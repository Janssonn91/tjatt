import './ChatMessage.scss';
import { vs2015 } from 'react-syntax-highlighter/dist/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ScrollableFeed from 'react-scrollable-feed';

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
    toggle: this.deleteMessageModalToggle.bind(this),
    selectedMessage: ''
  }

  toggleSnippetHeight = (index) => {
    if (this.fullHeightSnippet.some(obj => obj.index === index)) {
      let scroll = document.querySelector('.chat-row');
      let objIndex = this.fullHeightSnippet.findIndex(obj => obj.index === index);
      scroll.scrollTop = this.fullHeightSnippet[objIndex].scroll;
      this.fullHeightSnippet = this.fullHeightSnippet.filter(x => x.index !== index);

    } else {
      let scroll = document.querySelector('.chat-row').scrollTop;
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

  deleteMessageModalToggle = (id) => {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen
    this.sendToDeleteMessageModal.selectedMessage = id;
  }

  formattedTime(t) {
    t = new Date(t);
    let result = "";
    let today = new Date();
    let hour = t.getHours();
    let min = t.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    let ampm = hour <= 12 ? "AM" : "PM";
    hour = hour % 12;
    if (hour < 10) {
      hour = "0" + hour;
    }
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

  updateStar(message, currentStar) {
    const star = !currentStar;

    // update star of message in backend
    fetch(`/api/message/${message._id}/star`, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({ star }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          console.log('updated star');
          // update myStars array in frontend
          this.props.userStore.updateMyStars(message, star);
        }
      })
      .catch(err => console.log(err));
  }
}