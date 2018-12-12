import './Sidebar.scss';
export const imgPath = '/images/placeholder.png';

@inject('userStore', 'channelStore') @withRouter @observer export default class Sidebar extends Component {

  @observable updateSettingModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalupdateSetting.bind(this)
  }
  @observable addUserModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalAddNewUser.bind(this)
  }
  @observable createGroupModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.closeModal.bind(this)
  }

  @observable deleteContactModalOpen = {
    isOpen: false,
    keyboard: true,
    toggle: this.openModalDeleteContact.bind(this),
    channel: this.openModalDeleteContact.bind(this),
  }

  @observable systemMessagesModalOpen = {
    isOpen: false,
    keyboard:true,
    toggle:this.openSystemMessageModal.bind(this),
  }

  @observable collapseOpen = false;
  @observable contactsOpen = true;
  @observable groupsOpen = true;
  @observable tooltipOpen = false;

  start() {
    this.setupSystemMessage();
    // this.props.channelStore.getChannels();
  }

  loadChannelFromUrl() {
    const allChannels = this.props.channelStore.contactChannels.concat(this.props.channelStore.groupChannels);

    const matchingChannel = allChannels.find((contactChannel) => {
      return contactChannel.channelname === this.props.match.params.id;
    });

    if (matchingChannel && this.props.userStore.isLoggedIn) {
      this.props.channelStore.changeChannel(matchingChannel);
    }
  }

  componentDidMount() {
    observe(this.props.channelStore, "hasLoadedChannels", this.loadChannelFromUrl.bind(this));
    this.props.history.listen(this.loadChannelFromUrl.bind(this));
  }


  async toggle() {
    await sleep(1);
    this.collapseOpen = !this.collapseOpen;
  }

  openContacts = () => {
    this.contactsOpen = !this.contactsOpen;
  }

  openGroups = () => {
    this.groupsOpen = !this.groupsOpen;
  }

  openModalupdateSetting() {
    this.updateSettingModalOpen.isOpen = !this.updateSettingModalOpen.isOpen;
  }

  openModalAddNewUser() {
    this.addUserModalOpen.isOpen = !this.addUserModalOpen.isOpen
  }

  openModalCreateGroup() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;
  }

  closeModal() {
    this.createGroupModalOpen.isOpen = !this.createGroupModalOpen.isOpen;
    this.props.userStore.cleanUpGroupModal();
  }

  openModalDeleteContact(channel) {
    this.deleteContactModalOpen.isOpen = !this.deleteContactModalOpen.isOpen;
    if(this.deleteContactModalOpen.isOpen){
      this.deleteContactModalOpen.channel = channel;
      this.deleteContactModalOpen.members = channel.members;
      this.deleteContactModalOpen.channelId = channel._id;
    }
  }

  openSystemMessageModal(){
    this.systemMessagesModalOpen.isOpen = !this.systemMessagesModalOpen.isOpen;
  }

  toggleTooltip() {
    this.tooltipOpen = !this.tooltipOpen;
  }

  logout() {
    fetch('/api/logout').then(() => {
      this.props.channelStore.resetCurrentChannel();
      this.props.userStore.logout(); // set isLoggedIn false
      this.props.history.push('/');
      socket.emit("logout", this.props.userStore.user._id);
    });
  }

  setupSystemMessage(){
    const {userStore, channelStore} = this.props;
    socket.off('system');
    socket.on('system', async (data)=>{



    });

    socket.off('group');
    socket.on('group', message=>{
      if(message.textType.toString()==="groupInfo"){
        if(message.channel.toString()===channelStore.currentChannel._id){
          channelStore.changeChannel(channelStore.currentChannel);
        }
      }
      if(message.textType.toString() === "addedToGroup"){
        // message data structuer: {
        //   textType: "addedToGroup",
        //   initiator: userId
        //   targetChannel: data.newChannel
        //   unread: true,
        //   addedMembers: data.newChannel.members, || data.addedMembers,
        //   messageDict: messageDict,
        // }
       
        let c= message.targetChannel;
        let id= userStore.user._id.toString();
        for(let i of message.addedMembers) {
          if(i.toString()===id ){
            socket.emit('join channel', c._id);
            if(c.group){
              channelStore.groupChannels.push(c);
              let m = {
                sender: message.initiator,
                initiator: channelStore.userDict[message.initiator].name,
                targetChannel: message.targetChannel.channelname,
                unread: true,
                textType: message.textType,
                id: message.messageDict[id],
              }
              if(channelStore.unreadSystemMessages.includes(m)){
                return;
              }else{
                channelStore.unreadSystemMessages.push(m);
                channelStore.unreadSystemMessageNum++;
              }
            }
      }
    }

    if(message.textType.toString() === "removeFromGroup"){
      // message data structuer: {
      //   textType: "removeFromGroup",
      //   initiator: userId
      //   targetChannel: data.newChannel.channelname,
      //   unread: true,
      //   addedMembers: data.newChannel.members, || data.addedMembers
      // }
      let c= message.targetChannel;
      let id= userStore.user._id.toString();

    for(let i of message.removedMembers) {
      console.log("delete")
      if(i.toString()===id ){
        if(c.group){

          channelStore.deleteGroupChannel(c);
          let m = {
            sender: message.initiator,
            initiator: channelStore.userDict[message.initiator].name,
            targetChannel: message.targetChannel.channelname,
            unread: true,
            textType: message.textType,
            id: message.messageDict[id],
          }
          if(channelStore.unreadSystemMessages.includes(m)){
            return;
          }else{
            channelStore.unreadSystemMessages.push(m);
            channelStore.unreadSystemMessageNum++;
          }
        }
  }
}
    }

    
  }
    })


    socket.off('invitation');
    socket.on('invitation', data=>{
          if(data.invitee===userStore.user._id){
            console.log("invitation")
          let message= {
            sender: data.initiator,
            initiator: channelStore.userDict[data.initiator].name,
            targetChannel: data.targetChannel,
            unread: true,
            textType: data.textType,
            id:data.id,
          }
          channelStore.unreadSystemMessages.push(message);
          channelStore.unreadSystemMessageNum++;
          console.log(toJS(channelStore.unreadSystemMessages))
        }
    })

    socket.off('rejection');
    socket.on('rejection', data=>{
      console.log(data)
          if(data.rejectee===userStore.user._id){
            console.log("rejection")
          let message= {
            sender: data.initiator,
            initiator: channelStore.userDict[data.initiator].name,
            unread: true,
            textType: data.textType,
            id:data.id,
          }
          channelStore.unreadSystemMessages.push(message);
          channelStore.unreadSystemMessageNum++;
          console.log(toJS(channelStore.unreadSystemMessages))
        }
    })

    socket.off('acceptance');
    socket.on('acceptance', data=>{
      console.log(data)
      if(data.acceptee === userStore.user._id){
        let message={
          sender: data.sender,
          initiator: this.props.channelStore.userDict[data.sender].name,
          unread: true,
          textType: data.textType,
          targetChannel: data.targetChannel,
          id: data.id,
        }
        channelStore.unreadSystemMessages.push(message);
        channelStore.unreadSystemMessageNum++;
      }

       this.props.channelStore.updateContactChannels(data.targetChannel, data.sender);
       this.props.userStore.updateMyContact(data.sender);
    })

    socket.off('removeContact');
    socket.on('removeContact', data=>{
      if(data.target[0]=== userStore.user._id){
        let message={
          sender: data.sender,
          initiator: data.initiator,
          unread: true,
          textType: data.textType,
          id: data.id,
        }
        channelStore.unreadSystemMessages.push(message);
        channelStore.unreadSystemMessageNum++;
      }
    })

   


    

    // socket.off('system message');
    // socket.on('system message', message => {
    //   console.log('Message from server ', message);
    // });
    // socket.off('newChannel');
    // socket.on('newChannel', (data)=>{
        
    // });
  }

  changeLogStatus() {
    return false;
  }


}