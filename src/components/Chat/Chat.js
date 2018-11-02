
import './Chat.scss';
import ScrollableFeed from 'react-scrollable-feed';
import channelStore from '../../store/channel-store';

@inject('loginStore', 'channelStore') @observer
export default class Chat extends Component {

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
  @observable removeMemberModal = false;

  @observable sendToAddModal = {
    isOpen: false,
    toggle: this.addMemberModalToggle.bind(this)
  }

  @observable sendToDeleteModal = {
    isOpen: false,
    toggle: this.deleteMemberModalToggle.bind(this)
  }
  // chat history hard code
  @observable sendToChatHistory = {
    histories: this.chatHistories
  }
  




  //start chat


  start() {
   
   
  }

  scrollToBottom = () => {
    if(this.messagesEnd){
      this.messagesEnd.scrollIntoView({ behavior: "smooth" })
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  compontentDidUpdate() {
    this.scrollToBottom();
  }





  addMemberModalToggle() {
    this.sendToAddModal.isOpen = !this.sendToAddModal.isOpen
  }

  deleteMemberModalToggle() {
    this.sendToDeleteModal.isOpen = !this.sendToDeleteModal.isOpen
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



  sendMessage() {

    let newMessage = {
      sender: this.props.loginStore.user._id,
      text: this.inputMessage,
      channel: this.props.channelStore.currentChannel._id,
      textType: "text",
      star: false
    }
    if (this.inputMessage.length > 0) {
      socket.emit('chat message', newMessage);
      this.chatHistories.push(newMessage);

      this.scrollToBottom();

      console.log(this.chatHistories);
    } else {
      return false;
    }


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