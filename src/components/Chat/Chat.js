import './Chat.scss';

import ScrollableFeed from 'react-scrollable-feed';
import channelStore from '../../store/channel-store';
import EmojiPicker from 'emoji-picker-react';
import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';
import 'emoji-picker-react/dist/universal/style.scss';
import JSEMOJI from 'emoji-js';
import Textarea from 'react-textarea-autosize';
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

@inject('userStore', 'channelStore', 'applicationStateStore') @observer
export default class Chat extends Component {

  @observable emoji = '';
  @observable inputMessage = '';
  // @observable messagesEnd = '';

  @observable isOpen = false;
  @observable dropdownOpen = false;
  @observable addMemberModal = false;
  @observable viewMembersModal = false;
  @observable emojiDropdownOpen = false;
  @observable openSideDrawer = false;
  @observable buttonIsHovered = false;
  @observable snippetModal = false;
  @observable fileUploadError = false;
  @observable codefileValue = '';
  @observable gifPicker = false;


  @observable sendToAddDeleteModal = {
    isOpen: false,
    toggle: this.addDeleteMemberModalToggle.bind(this)
  }


  @observable sendToViewMembersModal = {
    isOpen: false,
    toggle: this.viewMembersModalToggle.bind(this)
  }



  @observable sendToLeaveModal = {
    isOpen: false,
    toggle: this.leaveGroupModalToggle.bind(this)
  }



  //start chat


  async start() {
    this.setupMessageListener();
    // observe(this.props.userStore, "isLoggedIn", ()=>{
    //   if(this.props.userStore.isLoggedIn){
    //     this.setupMessageListener();
    //     console.log("observing login")
    //   }
    // })
  }


  gifToggler = () => {
    this.gifPicker = !this.gifPicker;
  }

  sendGif = (entry) => {
    const url = entry.images.downsized_large.url;
    socket.emit('chat message', { filePath: url, isGif: true, channel: this.props.channelStore.currentChannel._id, sender: this.props.userStore.user._id, contentType: 'image', originalName: entry.title });
    this.gifToggler();
  }

  getFileValue = () => {
    let fileValue = document.querySelector('#codefile').files[0].name;
    this.codefileValue = fileValue;
  }

  toggleSnippet = () => {
    this.snippetModal = !this.snippetModal;
    this.codefileValue = '';
  }

  textfileHandler = (e) => {
    e.stopPropagation();
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('type', 'file');
    formData.append('type', 'image');

    fetch(`/api/fileupload/${this.props.channelStore.currentChannel._id}`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then(res => res.json())
      .then(message => {
        socket.emit('chat message', message)
        console.log(message);
      })
    this.toggle();
  }

  codefileHandler = () => {
    const file = document.querySelector('#codefile').files[0];
    console.log(file)
    let formData = new FormData();
    formData.append('file', file);

    fetch(`/api/codeUpload/${this.props.channelStore.currentChannel._id}`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }).then(res => {
      if (res.status === 400) {
        this.fileUploadError = true;
        setTimeout(() => {
          this.fileUploadError = false;
        }, 3000)
        throw new Error();
      }
      return res.json()
    })
      .then(message => {
        console.log(message)
        socket.emit('chat message', message)
        this.fileUploadError = false;
        this.toggleSnippet();
        let resetFile = document.querySelector('#codefile');
        resetFile.value = "";
        this.codefileValue = "";
      })
      .catch(err => err);
  }

  codeTextHandler = (message) => {
    let formData = new FormData();
    formData.append('isText', true);
    formData.append('code', message)

    fetch(`/api/codeUpload/${this.props.channelStore.currentChannel._id}`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then(res => res.json())
      .then(message => {
        socket.emit('chat message', message);
        // this.toggleSnippet();
      })


  }

  addDeleteMemberModalToggle() {
    this.sendToAddDeleteModal.isOpen = !this.sendToAddDeleteModal.isOpen
  }

  viewMembersModalToggle() {
    this.sendToViewMembersModal.isOpen = !this.sendToViewMembersModal.isOpen;
    if (!this.sendToViewMembersModal.isOpen) {
      this.props.channelStore.hideAdminLeaveError();
    }
  }

  leaveGroupModalToggle() {
    if (this.props.channelStore.currentGroupMembers.length === 1) {
      console.log('endast en medlem');
      this.sendToLeaveModal.isOpen = !this.sendToLeaveModal.isOpen
    }
    else if (this.props.channelStore.currentChannelAdmins.includes(this.props.userStore.user._id) && this.props.channelStore.currentChannelAdmins.length === 1) {
      this.props.channelStore.showAdminLeaveError();
      this.viewMembersModalToggle();
    }
    else {
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
      sender: this.props.userStore.user._id,
      text: this.inputMessage,
      channel: this.props.channelStore.currentChannel._id,
      textType: "text",
      contentType: 'text',
      star: false,
      unread: true,
    }
    if (this.inputMessage.length > 0) {

      socket.emit('chat message', newMessage);


    } else {
      return false;
    }
    await sleep(10);

    //  socket.emit('chat message', this.inputMessage);
    this.inputMessage = '';
  }

  setupMessageListener() {
    const { channelStore } = this.props;
    socket.off('chat message');
    socket.on(
      'chat message',
      (messages) => {
        for (let message of messages) {
          // let time = new Date(message.time);
          // console.log(time)

          // When you get a message, move the channel to the top of the list
          channelStore.moveLatestChannelToTop(message.channel);

          if (message.channel === channelStore.currentChannel._id) {
            let m = {
              _id: message._id,
              channel: message.channel,
              sender: message.sender,
              star: false,
              text: message.text,
              textType: message.textType,
              contentType: message.contentType,
              filePath: message.filePath,
              originalName: message.originalName,
              time: message.time,
              unread: true,
            };
            console.log(m)
            // time: time.toLocaleDateString() + ' ' + time.toLocaleTimeString(),
            channelStore.channelChatHistory.push(m)
          }
          if (message.sender) {
            channelStore.userDict[message.sender].status = true;
          }
          if (message.channel !== toJS(channelStore.currentChannel)._id) {
            channelStore.groupChannels.forEach(channel => {
              if (channel._id === message.channel) {
                if (!channel.messageNum) {
                  channel.messageNum = 1;
                } else {
                  channel.messageNum++;
                }
              }
            })
            channelStore.contactChannels.forEach(channel => {
              if (channel._id === message.channel) {
                if (!channel.messageNum) {
                  channel.messageNum = 1;
                } else {
                  channel.messageNum++;
                }
              }
            })
          }
        }
        let scroll = document.querySelector('._scrollable-div_1dj6m_1');
        if (scroll && (scroll.scrollTop > (scroll.scrollHeight - scroll.clientHeight - 200))) {
          scroll.scrollTop = scroll.scrollHeight;
        }
      })
  }



  openSideDrawerHandler() {
    this.openSideDrawer = !this.openSideDrawer;
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

  setButtonHovered(boolean) {
    this.buttonIsHovered = boolean;
  }

}