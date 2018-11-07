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
  @observable groupMembers = [];
  @observable groupMemberCandidates = [];
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable channelChatHistory = [];
  @observable contactImg = "";
  @observable contactChannelname = "";


  //TODO: as a new user, introduction page shows instead of chat page

  @action async getChannels() {
    this.myChannels = await Channel.find({
      _id: loginStore.user.channel,
    })
    this.groupChannels = [];
    this.contactChannels = [];
    this.myChannels.forEach(
      channel => {
        if (channel.group === false) {
          this.contactChannels.push(channel);
        }
        if (channel.group === true) {
          this.groupChannels.push(channel);
        }
      }

    );
    await sleep(60);
    this.renderChannels();
  }


  renderChannels() {
    this.renderChannelElements(this.groupChannels, 'group', 'groupsRender');
    this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
  }

  async renderChannelElements(channels, type, anchor) {
    let contact = "";
    let elements = await channels.map(async (channel, i) => {
      let img = "";
      let channelname = "";
      if (type === "contact") {
        contact = await this.getContactName(channel.members);
      }
      return (type === 'group' ?
        <div key={i} className="nav-link pl-5 pl-md-4 py-md-1 contacts" onClick={() => this.changeChannel(channel)}>
          <div className="d-inline-block" >{channel.channelname} </div>
        </div>
        :
        <div key={i} className="nav-link pl-5 pl-md-4 py-md-1 contacts" onClick={() => this.changeChannel(channel)}>
          <CardImg className="mr-2 d-inline-block" src={contact.contactImg || "/images/placeholder.png"} />
          <div className="d-inline-block" >{contact.contactChannelname}</div>
        </div>
      );
    });

    Promise.all(elements).then((els) => {
      ReactDOM.render(els, document.getElementById(anchor));
    }).catch(err => console.log(err));
  }

  async getContactName(ids) {
    let n = ids.filter(id => { return id !== loginStore.user._id });
    let contact = {};
    if (n[0]) {
      let res = await fetch(`/api/users/${n}`);
      let user = await res.json();
      contact.contactImg = user.image;
      contact.contactChannelname = user.nickname;
      return contact;
    }
  }

  getGroupMembersData(ids) {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const isIncluded = (userId) => {
          return ids.some(id => userId === id);
        }
        this.groupMembers = users.filter(user => isIncluded(user._id));
        this.groupMemberCandidates = users.filter(user => !isIncluded(user._id));
      });
  }

  @action async changeChannel(channel) {
    
    this.currentChannel = channel;
    this.currentChannelGroup = channel.group;
    this.showChat();
    let admin = [];
    if(typeof(channel.admin)==="string"){
      admin.push(channel.admin);
      console.log(admin)
    }else{
      admin= channel.admin;
    }
    this.amIAdmin = admin.some(a => a === loginStore.user._id);
    let element="";
    if(!channel.group){
      const name = await this.getContactName(channel.members);
      this.channelName = name.contactChannelname;
    } else {
      this.getGroupMembersData(channel.members);
      this.channelName = channel.channelname;
    }
    window.history.pushState(null, null, "/" + loginStore.user.username + "/" + this.channelName);
  }

  @action getChannelChatHistory() {
    // TODO: socket channel
    console.log(this.channelChatHistory)
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
    if(!group){
      this.updateContactChannels(this.newChannel);
    }
    if (group) {
      this.updateGroupChannel(this.newChannel)
    }

    return Channel.create(this.newChannel);
  }

  @action createGroup(groupName) {
    const admin = loginStore.user._id;
    const members = loginStore.selectedGroupMember.map(user => user._id);
    members.push(admin);
    this.createChannel(groupName, admin, members, true)
      .then((channel) => {
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
      })
  }





  // if(type==="contact"){
  //   this.getChannelByUser(id);
  // }
  // if(type === "group"){
  //   this.getGroupChannel(id);
  // }
  // this.channelChatHistory=[];
  // this.getChannelChatHistory()



  updateContactChannels(channel) {
    console.log(channel)
    this.contactChannels.push(channel);
    console.log(this.contactChannels)
    this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
    //this.props.channelStore.getChannelByUser(user._id)}
  }

  @action saveMessageToChannel(message) {
    this.channelChatHistory.push(message);
    // console.log(message)
    // //await sleep(60)
    // await Message.findOne({channel: message.channel, text: message.text}).then((data)=>{
    //   console.log(data)
    // })

  }

 
 

  // @action updateContactChannels() {
  //   this.contactChannels.push(this.newChannel);
  // }

  updateGroupChannel(channel) {
    console.log(this.groupChannels)
    this.groupChannels.push(channel);
    console.log(this.groupChannels)
    console.log(channel)
    this.renderChannelElements(toJS(this.groupChannels), 'group', 'groupsRender');
    // console.log(this.groupChannels);
    // this.renderGroup();
    // this.getGroupChannel(this.newChannel);
  }

  // @action async getChannelByUser(userId) {
  //   this.currentChannel = "";
  //   this.channelName = "";
  //   this.channelImg = "";
  //   // this.currentChannelType = "";
  //   console.log(this.contactChannels)
  //   this.contactChannels.map(channel => {
  //     channel.admin.map(data => {
  //       if (data === userId) {
  //         console.log(channel)
  //         return this.currentChannel = channel;
  //       }
  //     })
  //   })
  //   //mobil version
  //   this.showChat();
  //   this.getChannelInfo();
  // }

  //   @action getGroupChannel(channel) {
  //     this.currentChannel = channel;
  //     this.channelName = channel.channelname;
  //     this.currentChannelGroup = channel.group;
  //     this.showChat();
  // }

  // @action getChannelInfo() {

  //   console.log(this.currentChannel)
  //   let channel = this.currentChannel;
  //   this.amIAdmin = channel.admin.some(a => a === loginStore.user._id);
  //   if (!channel) {
  //     console.log("hej")
  //   } else {
  //     console.log(channel)
  //     if (channel.group === false) {
  //       this.currentChannelGroup = false;
  //       let nameId = channel.admin.filter(a => a !== loginStore.user._id);
  //       let otheruser = loginStore.myContacts.filter(user =>
  //         user._id === nameId[0]);
  //       //console.log(toJS(otheruser))
  //       this.channelName = otheruser[0].nickname;
  //       this.channelImg = otheruser[0].image;
  //       this.amIAdmin = true;
  //     } else {
  //       this.currentChannelGroup = true;
  //       this.channelName = channel.channelname;

  //       //TODO: whether login user is admin or not
  //     }
  //   }
  //   console.log(this.channelName)


  // }

  @action showMenu() {
    this.hideMenu = false;
    this.hideChat = true;
  }

  @action showChat() {
    this.hideMenu = true;
    this.hideChat = false;
  }
}


const channelStore = new ChannelStore();
export default channelStore;