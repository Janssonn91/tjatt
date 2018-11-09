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
  @observable chatHistories = [{
    id: 1,
    image: "/images/uploads/pikachu.png-1540468459565.png",
    time: "10:20 AM, Today",
    sender: "Pika",
    status: "online",
    channel: "group one",
    text: "How are you?",
    textType: "text",
    star: false
  },
  {
    id: 2,
    time: "10:21 AM, Today",
    image: "/images/placeholder.png",
    sender: "other",
    status: "offline",
    channel: "group one",
    text: "I am fine, thank you. And you?",
    textType: "text",
    star: false
  },
  {
    id: 3,
    time: "10:24 AM, Today",
    image: "/images/placeholder.png",
    sender: "another",
    status: "online",
    channel: "group one",
    text: " Good!",
    textType: "text",
    star: false
  }
  ];
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
  @observable sendToChatHistory = {
    histories: this.chatHistories
  }

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
    this.sendToViewMembersModal.isOpen = !this.sendToViewMembersModal.isOpen
    console.log(toJS(this.props.channelStore.currentAdmins));
  }

  leaveGroupModalToggle() {
    this.sendToLeaveModal.isOpen = !this.sendToLeaveModal.isOpen
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

      //  Message.find({sender:newMessage.sender}).then(message=>{
      //    console.log(message);
      //  })
      // Message.findOne({sender: newMessage.sender,
      //   channel:newMessage.channel,
      //   text: newMessage.text}).then(message=>{
      //     console.log(message)
      //   })
      // let channelId = this.currentChannel._id;
      // let query = '_id' + channelId;
      // let body = {
      //   content: message
      // };
      // Channel.request(Channel, "POST", query, body).then((data)=>console.log(data))
      //}


      this.chatHistories.push(newMessage);

      this.scrollToBottom();

      console.log(this.chatHistories);
    } else {
      return false;
    }
    await sleep(10);
    this.props.channelStore.saveMessageToChannel(newMessage);


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