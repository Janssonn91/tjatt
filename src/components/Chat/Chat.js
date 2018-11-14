import './Chat.scss';

import ScrollableFeed from 'react-scrollable-feed';
import channelStore from '../../store/channel-store';
import EmojiPicker from 'emoji-picker-react';
import 'emoji-picker-react/dist/universal/style.scss';
import JSEMOJI from 'emoji-js';
// you can import it with a script tag instead


// new instance
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
// jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

// some more settings...
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

@inject('loginStore', 'channelStore') @observer
export default class Chat extends Component {

  @observable emoji = '';
  @observable inputMessage = '';
  // @observable messagesEnd = '';
  
  @observable isOpen = false;
  @observable dropdownOpen = false;
  @observable addMemberModal = false;
  @observable viewMembersModal = false;
  @observable emojiDropdownOpen = false;

  @observable sendToAddDeleteModal = {
    isOpen: false,
    toggle: this.addDeleteMemberModalToggle.bind(this)
  }


  @observable sendToViewMembersModal = {
    isOpen: false,
    toggle: this.viewMembersModalToggle.bind(this)
  }

  // chat history hard code
  // @observable sendToChatHistory = {
  //   histories: this.chatHistories
  // }

  @observable sendToLeaveModal = {
    isOpen: false,
    toggle: this.leaveGroupModalToggle.bind(this)
  }



  //start chat


  start() {


  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  compontentDidUpdate() {
    this.scrollToBottom();
  }

  addDeleteMemberModalToggle() {
    this.sendToAddDeleteModal.isOpen = !this.sendToAddDeleteModal.isOpen
  }

  viewMembersModalToggle() {
    this.sendToViewMembersModal.isOpen = !this.sendToViewMembersModal.isOpen;
  }

  leaveGroupModalToggle() {
    console.log(toJS(this.props.channelStore.currentChannelAdmins));
    console.log(this.props.channelStore.currentChannelAdmins.length);
    // console.log((this.props.channelStore.currentChannel.admin).length);
    // console.log(this.props.channelStore.currentChannel.admin);
    // console.log(this.props.channelStore.amIAdmin);
    // console.log(toJS(this.props.channelStore.currentGroupMembers));
     console.log(this.props.channelStore.currentChannel.admin.includes(this.props.loginStore.user._id));
    // console.log((this.props.channelStore.currentChannel.admin.length < 2 || (typeof(this.props.channelStore.currentChannel.admin === 'string'))))
    // console.log((typeof(this.props.channelStore.currentChannel.admin === 'string')));
    if(this.props.channelStore.currentGroupMembers.length === 1){
      console.log('endast en medlem');
      this.sendToLeaveModal.isOpen = !this.sendToLeaveModal.isOpen
    }
    else if(this.props.channelStore.currentChannelAdmins.includes(this.props.loginStore.user._id) && this.props.channelStore.currentChannelAdmins.length === 1){
      this.props.channelStore.showAdminLeaveError();
      this.viewMembersModalToggle();
    }
    /*else if(this.props.channelStore.currentChannel.admin.includes(this.props.loginStore.user._id) && (typeof(this.props.channelStore.currentChannel.admin === 'string'))){
      this.props.channelStore.showAdminLeaveError();
      this.viewMembersModalToggle();
    }*/
    else{
      this.sendToLeaveModal.isOpen = !this.sendToLeaveModal.isOpen
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  messageChange(e) {
    this.inputMessage = e.currentTarget.value;
  }

  getEmoji = (emoji) => {
    let emojiPick = jsemoji.replace_colons(`${emoji}`).split('-');
    for (let pick of emojiPick) {
      this.inputMessage += String.fromCodePoint(('0x' + pick) / 1);
    }
  }

  emojiDropdownToggle = () => {
    this.emojiDropdownOpen = !this.emojiDropdownOpen;
  }

  async sendMessage() {

    let newMessage = {
      sender: this.props.loginStore.user._id,
      text: this.inputMessage,
      channel: this.props.channelStore.currentChannel._id,
      textType: "text",
      star: false
    }
    if (this.inputMessage.length > 0) {

      socket.emit('chat message', newMessage);

      this.scrollToBottom();

  
    } else {
      return false;
    }
    await sleep(10);


    //  socket.emit('chat message', this.inputMessage);
    this.inputMessage = '';
  }


  //  scrollToBottom = () => {
  //     const { messageList } = this.refs;
  //     const scrollHeight = messageList.scrollHeight;
  //     const height = messageList.clientHeight;
  //     const maxScrollTop = scrollHeight - height;
  //     ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  //     };

  formattedDate(d) {
    let result = "";
    let today = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();
    let ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    min = min < 10 ? '0' + min : min;
    if (today.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0)) {
      result += hour + ":" + min + " " + ampm + " Today";
      return result;
    } else {
      result += d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() +
        " " + hour + ":" + min + " " + ampm;
      return result;
    }
    // var d = new Date();


  }

}