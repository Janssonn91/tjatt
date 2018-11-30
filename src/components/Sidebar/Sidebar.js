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

  @observable collapseOpen = false;
  @observable contactsOpen = true;
  @observable groupsOpen = true;

  start() {
    this.setupSystemMessage();
    // this.props.channelStore.getChannels();
  }

  loadChannelFromUrl() {
    const allChannels = this.props.channelStore.contactChannels.concat(this.props.channelStore.groupChannels);

    const matchingChannel = allChannels.find((contactChannel) => {
      return contactChannel.channelname === this.props.match.params.id;
    });

    if (matchingChannel) {
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
      if(data.invitee){
        if(data.invitee === userStore.user._id){
         socket.emit('invitation', data);
        }
      }

      // group channel
      if(data.newChannel){
        let c= data.newChannel;
        let id= userStore.user._id.toString();
        for(let i of c.members) {
          if(i.toString()===id ){
            if(c.group){
              channelStore.groupChannels.push(c);
              socket.emit('newChannel', data.newChannel);
              console.log(channelStore.groupChannels)
            }
          //   else{
          //     let name = await channelStore.getContactName(c.members);
          //     if (name !== undefined) {
          //     channelStore.channelDict[c._id] = { _id: c._id, channelname: name.name, image: name.img, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open, messageNum: c.messageNum }
          //   channelStore.contactChannels.push(channelStore.channelDict[c._id]);
          // } 
          //   }
          
          }
        }
      }

    });

    socket.off('system message');
    socket.on('system message', message => {
      console.log('Message from server ', message);
    });
    socket.off('newChannel');
    socket.on('newChannel', (data)=>{
        
    });
  }

  changeLogStatus() {
    return false;
  }

}