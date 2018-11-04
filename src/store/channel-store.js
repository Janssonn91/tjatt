import {
  loginStore
} from './login-store';
import {
  renderReporter
} from 'mobx-react';
class ChannelStore {
    @observable newChannel = [];
    @observable myChannels = [];
    @observable currentChannel = "";
    @observable channelName = "";
    @observable channelImg = "";
    @observable currentChannelGroup = false;
    @observable amIAdmin = "";
    @observable contactChannels = [];
    @observable groupChannels = [];
    @observable hideMenu = true;
    @observable hideChat = false;
    @observable channelChatHistory = [];


  //TODO: as a new user, introduction page shows instead of chat page

  @action async getChannels() {
    this.myChannels= await Channel.find({
      _id: loginStore.user.channel,
    })
    this.groupChannels=[];
    this.contactChannels=[];
    this.myChannels.forEach(
          channel => {
            if (channel.group === false) {
              this.contactChannels.push(channel);
            }
            if (channel.group === true){
              this.groupChannels.push(channel);
            }
          }

        );
        // this.renderContect();
        //this.renderGroup();
        this.renderChannels();
      }

    @action getChannelChatHistory(){
      // let channelMessage= Message.find({
      //   channel: this.currentChannel
      // })

      // this.channelChatHistory= channelMessage;
      console.log(this.channelChatHistory)
    }

  @action renderChannels(){
    this.renderChannelElements(this.groupChannels, 'group',  'groupsRender');
    this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
    
  }

  @action renderChannelElements(channels, type, anchor){
    let elements=[];
    let element="";
    //let contactName = this.getContactName(channel);
    channels.map((channel, i)=>{
      element = <div key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={() => this.changeChannel("group", channel)}>
      <div className="d-inline-block" >{type==='group' ? channel.channelname : "name"}</div>
    </div>
    elements.push(element);
    })
    ReactDOM.render(elements, document.getElementById(anchor));
  }

  @action getContactName(names){
    console.log(names)
    console.log(loginStore.user.name)
    let n = names.filter(name=> name!=loginStore.user.name);
    console.log(n)
  }





  @action createChannel(channelname, admin, members, group) {
    this.newChannel = {
      channelname: channelname,
      admin: admin,
      members: members,
      favorite: false,
      open: true,
      group: group
    }
    return Channel.create(this.newChannel);
    // .then(() => {
    //     return Channel.findOne({
    //         channelname: this.newChannel.channelname
    //     });
    // })
  }

  @action addChannel(groupName) {
    const admin = loginStore.user._id;
    const members = loginStore.selectedGroupMember.map(user => user._id);
    members.push(admin);
    this.createChannel(groupName, admin, members, true).then((channel) => {
      channel.members.forEach(member => {
        fetch(`/api/users/${member}`, {
          method: 'PUT',
          body: JSON.stringify({
            _id: member,
            channel: channel._id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            res.json();
          }).catch(err => {
            console.log(err);
          })
      })
    }).then(() => {
      //this.getChannels();
      this.updateGroupChannel();
      this.cleanUpGroupModal();
      //loginStore.groupCandidates = loginStore.myContacts;
    })
  }

  @action changeChannel(type, id){
    if(type==="contact"){
      this.getChannelByUser(id);
    }
    if(type === "group"){
      this.getGroupChannel(id);
    }
    this.channelChatHistory=[];
    this.getChannelChatHistory()
    

  }
//this.props.channelStore.getChannelByUser(user._id)}

@action async saveMessageToChannel(message){
  this.channelChatHistory.push(message);
  // console.log(message)
  // //await sleep(60)
  // await Message.findOne({channel: message.channel, text: message.text}).then((data)=>{
  //   console.log(data)
  // })
  
}


  @action cleanUpGroupModal(){
    // TODO: cleanup has bug, remove new added contact need to be fixed
    // need new method to renew groupCandidates
    loginStore.selectedGroupMember = [];
    //loginStore.fetchContact();
}

@action updateContactChannels() {
    this.contactChannels.push(this.newChannel);
  }

  @action updateGroupChannel() {
    //console.log(this.myChannels, this.newChannel)
    this.groupChannels.push(this.newChannel);
    //this.myChannels.push(this.newChannel);
    console.log(this.groupChannels);
    this.renderGroup();
    this.getGroupChannel(this.newChannel);
  }

  @action async getChannelByUser(userId) {
    this.currentChannel = "";
    this.channelName = "";
    this.channelImg = "";
    // this.currentChannelType = "";
    console.log(this.contactChannels)
    this.contactChannels.map(channel => {
      channel.admin.map(data => {
        if (data === userId) {
          console.log(channel)
          return this.currentChannel = channel;
        }
      })
    })
    //mobil version
    this.showChat();
    this.getChannelInfo();
  }

  @action getGroupChannel(channel) {
    this.currentChannel = channel;
    this.channelName = channel.channelname;
    this.currentChannelGroup = channel.group;
    this.showChat();
}

  @action getChannelInfo() {

    console.log(this.currentChannel)
    let channel = this.currentChannel;
    this.amIAdmin = channel.admin.some(a => a === loginStore.user._id);
    if (!channel) {
      console.log("hej")
    } else {
      console.log(channel)
      if (channel.group === false) {
        this.currentChannelGroup = false;
        let nameId = channel.admin.filter(a => a !== loginStore.user._id);
        let otheruser = loginStore.myContacts.filter(user =>
          user._id === nameId[0]);
        //console.log(toJS(otheruser))
        this.channelName = otheruser[0].nickname;
        this.channelImg = otheruser[0].image;
        this.amIAdmin = true;
      } else {
        this.currentChannelGroup = true;
        this.channelName = channel.channelname;

        //TODO: whether login user is admin or not
      }
    }
    console.log(this.channelName)


  }

@action showMenu() {
    this.hideMenu = false;
    this.hideChat = true;
  }

@action showChat(){
    this.hideMenu = true;
    this.hideChat = false; 
}
}




const channelStore = new ChannelStore();
export default channelStore;