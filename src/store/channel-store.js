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
  @observable currentGroupMembers = [];
  @observable currentGroupCandidates = [];
  @observable searchedGroupCandidates = [];
  @observable groupAdminId = "";
  @observable addedSuccess = false;
  @observable removedSuccess = false;
  @observable viewMembers = [];
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable channelChatHistory = [];
  @observable contactImg = "";
  @observable contactChannelname = "";
  @observable userDict = {};
  @observable adminLeavingError = false;
  // holds all the admins of the current group
  @observable currentChannelAdmins = [];
  @observable channelDict ={};

  // constructor() {
  // this.listenToPopState();
  // }

  // This is a dirty Thomas hack to fick back/forward buttons
  // so that the work with channel changes
  // - would have been better to do with React Router
  // but can't get the router to work with elements directly
  // React.rendered from the store...
  listenToPopState() {
    // Add a raw JS listener to popstate
    // if it hasn't been added before
    if (!this.popStateListenerSet) {
      console.log('adding listener');
      this.popStateListenerSet = true;
      window.onpopstate = async () => {

        // since non-group channels don't have human readable
        // channel names - just ids - we need to fetch the readble names
        // we store those in a new properrt ._contact.contactChannelname
        for (let channel of this.myChannels) {
          if (!channel.group) {
            let user = this.getContactName(channel.members);
            console.log(user)
            channel._contact =  user.name;
          }
        }

        // Now let's try to find a match between the url path and a channel name
        // and change to that channel
        let channelFound = false;
        let lastUrlPart = window.location.pathname.split('/').pop();
        for (let channel of this.myChannels) {
          let cname = !channel.group && channel._contact ? channel._contact : channel.channelname;
          if (lastUrlPart === cname) {
            this.changeChannel(channel, false);
            channelFound = true;
            break;
          };
        }

        // I (Thomas) have NO IDEA how to restore the initial view "PLACE HOLDER"
        // when we hit the back button and do not find a channel (see above)
        // so this is EXTREMELY DIRTY - I just do a hard reload of the whole page
        if (!channelFound) {
          window.location.reload();
        }
      }
    }
  }

  //TODO: as a new user, introduction page shows instead of chat page

  // @action async getChannels() {
  //   this.myChannels = [];
  //   this.myChannels = await Channel.find({
  //     _id: loginStore.user.channel,
  //   })
  //   this.groupChannels = [];
  //   this.contactChannels = [];
  //   this.myChannels.forEach(
  //     channel => {
  //       if (channel.group === false) {
  //         this.contactChannels.push(channel);
  //       }
  //       if (channel.group === true) {
  //         this.groupChannels.push(channel);
  //       }
  //     }

  //   );
  //   await sleep(60);
  //   //this.renderChannels();
  //   this.myChannels.map((channel) => {
  //     return socket.emit('join channel', channel._id)
  //   });
  // }


  // renderChannels() {
  //   this.renderChannelElements(this.groupChannels, 'group', 'groupsRender');
  //   this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
  // }
  // async renderChannelElements(channels, type, anchor) {
  //   console.log("anchor", anchor)
  //   console.log(document.getElementById(anchor))
  //   let contact = "";
  //   let elements = await channels.map(async (channel, i) => {
  //     let img = "";
  //     let channelname = "";
  //     if (type === "contact") {
  //       contact = await this.getContactName(channel.members);
  //     }
  //     return (type === 'group' ?
  //       <div key={i} className="nav-link pl-5 pl-md-3 py-md-1 pr-1 contacts" onClick={() => this.changeChannel(channel)}>
  //         <div className="d-inline-block" >{channel.channelname} </div>
  //       </div>
  //       :
  //       <div key={i} className="nav-link pl-5 pl-md-3 py-md-1 pr-1 contacts" onClick={() => this.changeChannel(channel)}>
  //         <CardImg className="mr-2 d-inline-block" src={contact.contactImg || "/images/placeholder.png"} />
  //         <div className="d-inline-block" >{contact.contactChannelname}</div>
  //       </div>
  //     );
  //   })
  //   Promise.all(elements).then((els) => {
  //     ReactDOM.render(els, document.getElementById(anchor));
  //   }).catch(err => console.log(err));
  // }


  @action getContactName(ids) {
    let n = ids.filter(id => { return id !== loginStore.user._id });
    let u = this.userDict[n];
    return u;
    // let contact = {};
    // if (n[0]) {
    //   let res = await fetch(`/api/users/${n}`);
    //   let user = await res.json();
    //   contact.contactImg = user.image;
    //   contact.contactChannelname = user.nickname;
    //   return contact;
    // }
  }

  @action async getUserList() {
    let res = await fetch('/api/users');
    let user = await res.json();
    user.map((u) => {
      return this.userDict[u._id] = { name: u.nickname, img: u.image, status: false }
     
    })
    console.log(this.userDict)
  }
  
  @action async getLoginStatus(){
      if(loginStore.onLineUsers){
        for(let id of loginStore.onLineUsers){
          if(this.userDict[id]){
            this.userDict[id].status = true;
          }
        
        }
      }
    }
  

  @action async getChannelList(){
    console.log(this.userDict)
    this.groupChannels = [];
    this.contactChannels = [];
    this.myChannels = [];
    this.myChannels = await Channel.find({_id: loginStore.user.channel,});
      this.myChannels.map((c)=>{
      socket.emit('join channel', c._id)
      if(c.group){
        this.channelDict[c._id] = {_id:c._id, channelname: c.channelname, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open}
        this.groupChannels.push(this.channelDict[c._id]);
        console.log("check group",  this.groupChannels)
      }else{
        let name = this.getContactName(c.members);
        this.channelDict[c._id] = {_id:c._id, channelname: name.name, image: name.img, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open }
        this.contactChannels.push(this.channelDict[c._id]);
        // let n = c.members.filter(id=>{ return id!== loginStore.user._id});
        // this.channelDict[c._id] = {_id:c._id, channelname: this.userDict[n].name, image: this.userDict[n].image, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open }
        // this.contactChannels.push(this.channelDict[c._id])
      }
      
    })
  }



  getGroupMembersData(memberIds) {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const isGroupMember = (userId) => {
          return memberIds.some(id => userId === id);
        }
        const existInMyContact = (userId) => {
          return loginStore.user.contact.some(contactId => userId === contactId);
        }
        this.currentGroupMembers = users.filter(user => isGroupMember(user._id));
        const nonMembers = users.filter(user => !isGroupMember(user._id));
        this.currentGroupCandidates = nonMembers.filter(user => existInMyContact(user._id));
        this.viewMembers = [...this.currentGroupMembers]; // Copy members for viewMembersModal
      });
  }

  @action async changeChannel(channel) {
    console.log(channel)
    this.currentChannel = channel;
    console.log("channelname", this.currentChannel)
    
    this.showChat();
    this.getChannelChatHistory(this.currentChannel._id);
    this.getLoginStatus();

    this.currentChannelAdmins = [];
    this.ChannelChatHistory = [];
   
    //this.currentChannelGroup = channel.group;
    //this.currentChannel.admin = [];
    // this.currentChannel.admin.push(channel.admin);
    // console.log(this.currentChannel.admin);
    
    
    
    let admin = [];
    if (typeof (channel.admin) === "string") {
      admin.push(channel.admin);
      console.log(admin)
      this.currentChannelAdmins.push(channel.admin);
      console.log(this.currentChannelAdmins);
      //this.currentChannel.admin.push(channel.admin);
      //console.log(this.currentChannel.admin);
    } else {
      admin = channel.admin;
      this.currentChannelAdmins = channel.admin;
      console.log(this.currentChannelAdmins);
      console.log(admin);
      //this.currentChannel.admin = channel.admin;
    }
    this.amIAdmin = admin.some(a => a === loginStore.user._id);
    let element = "";
    if (!channel.group) {
      const name = await this.getContactName(channel.members);
      this.channelName = name.contactChannelname;
    } else {
      this.getGroupMembersData(channel.members);
      this.channelName = channel.channelname;
      this.groupAdminId = channel.admin[0];
    }
    // if (addPushState) {
    window.history.pushState(null, null, "/" + loginStore.user.username + "/" + this.channelName);
    // }
  }

  async getChannelChatHistory(id) {
    console.log("changeChannel", id)
    this.channelChatHistory = [];
    this.channelChatHistory = await Message.find({
      channel: id
    });
    console.log(this.channelChatHistory)
    // this.renderChatMessage();
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
    Channel.create(this.newChannel);
  }

  @action async createGroup(groupName) {
    const admin = loginStore.user._id;
    const members = loginStore.selectedGroupMember.map(user => user._id);
    members.push(admin);
    this.createChannel(groupName, admin, members, true);
    await sleep(60);
    Channel.find({ channelname: groupName }).then(channel => {
      this.changeChannel(channel[0]);
      this.groupChannels.push(channel[0]);
      channel[0].members.forEach(member => {
        console.log("push channel into member", member)
        fetch(`/api/users/${member}`, {
          method: 'PUT',
          body: JSON.stringify({
            _id: member,
            channel: channel[0]._id
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
      socket.emit('newChannel', channel[0]._id)
     
      //this.updateGroupChannel(channel[0]);
    })
  }




  updateContactChannels(channel) {
    console.log(channel)
    this.contactChannels.push(channel);
    console.log(this.contactChannels);
    this.getChannelList();
   
    //await this.getChannels();
   // this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
    //this.props.channelStore.getChannelByUser(user._id)}
  }


  // updateGroupChannel(channel) {
  //   console.log(this.groupChannels)
  //   this.groupChannels.push(channel);
  //   console.log(this.groupChannels)
  //   console.log(channel)
  //   //this.renderChannelElements(toJS(this.groupChannels), 'group', 'groupsRender');
  //   //  this.getChannels();
  //   // console.log(this.groupChannels);
  //   // this.renderGroup();
  //   // this.getGroupChannel(this.newChannel);
  // }

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

  @action setAdmin(newAdminId) {
    this.adminLeavingError = false;
    this.currentChannelAdmins = [...this.currentChannelAdmins, newAdminId];
    // this.currentChannel.admin = [...this.currentChannel.admin, newAdminId];
    console.log(this.currentChannel);
    console.log(this.currentChannel._id);
    fetch(`/api/updateAdmin/${this.currentChannel._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        adminId: newAdminId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(res => {
        console.log('admin updated: ', res)
      })
      .catch(err => {
        console.log(err);
      })
  }

  @action showAdminLeaveError() {
    this.adminLeavingError = true;
  }

  @action exitChannel(channel) {
    // remove the user from the channel
    for (let channelArr of this.myChannels) {
      if (channelArr._id === channel._id) {
        const index = channel.members.indexOf(loginStore.user._id);
        if (index > 0) {
          channel.members.splice(index, 1);
        };
      }
    }

    // remove the channel from the user and re-render users channels
    let i = 0;
    for (let channelArr of this.groupChannels) {
      if (channelArr._id === channel._id) {
        this.groupChannels.splice(i, 1);
      }
      i++;
    }
    //this.renderChannels();
    // test att lämna grupp och historik i frontend
    this.ChannelChatHistory = [];
    this.currentChannelGroup = false;
    this.channelName = '';

    // remove both channel from user and user from channel in backend
    const userId = loginStore.user._id;
    fetch(`/api/memberChannels/${channel._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userid: userId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(res => {
        console.log(res.resultChannel, res.resultUser)
      })
      .catch(err => {
        console.log(err);
      })
    if (this.amIAdmin) {
      this.removeAdmin(userId, channel);
    }
    if (this.currentGroupMembers.length === 1) {
      this.deleteGroup(channel);
    }
    window.history.pushState(null, null, '/' + loginStore.user.username);
  }

  deleteGroup(channel) {
    fetch(`/api/removeGroup/${channel._id}`, {
      method: 'DELETE'
    })
      .then(res => {
        res.json()
      })
      .then(() => {
        console.log(`slut på group, ${channel._id}`)
      })
  }

  removeAdmin(id, channel) {
    // remove admin from frontend
    let index = this.currentChannel.admin.indexOf(id);
    this.currentChannel.admin.splice(index, 1);
    // remove admin from db
    fetch(`/api/removeAdmin/${channel._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        userid: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
    this.amIAdmin = false;
  }

  @action searchCandidates(regex) {
    this.searchedGroupCandidates = this.currentGroupCandidates.filter(user => {
      return regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email)
    })
  }

  @action selectOneForGroup(user) {
    this.currentGroupMembers.push(user);
    const addedUser = this.currentGroupCandidates.find(u => u._id === user._id);
    const index = this.currentGroupCandidates.indexOf(addedUser);
    this.currentGroupCandidates.splice(index, 1);

    // Remove user also from searchedGroupCandidates
    const i = this.searchedGroupCandidates.indexOf(addedUser);
    this.searchedGroupCandidates.splice(i, 1);
  }

  @action removeFromSelect(user) {
    this.currentGroupCandidates.push(user);
    const addedUser = this.currentGroupMembers.find(u => u._id === user._id);
    const index = this.currentGroupMembers.indexOf(addedUser);
    this.currentGroupMembers.splice(index, 1);

    // Add user also to searchedGroupCandidates
    this.searchedGroupCandidates.push(user);
  }

  updateUserChannel(channelId, newMemberIds, previousMemberIds) {
    const wasMember = user => previousMemberIds.some(id => id === user);
    const isMember = user => newMemberIds.some(id => id === user);
    const addedUser = newMemberIds.filter(user => !wasMember(user));
    const removedUser = previousMemberIds.filter(user => !isMember(user));

    if (addedUser.length > 0) {
      addedUser.forEach(id => {
        fetch(`/api/users/${id}/add`, {
          method: 'PUT',
          body: JSON.stringify({
            channel: channelId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(result => {
            if (result.succes) {
              this.addedSuccess = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.addedSuccess = false;
          })
      });
    }
    this.addedSuccess = true;

    if (removedUser.length > 0) {
      removedUser.forEach(id => {
        fetch(`/api/users/${id}/remove`, {
          method: 'PUT',
          body: JSON.stringify({
            channel: channelId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(result => {
            if (result.succes) {
              this.removedSuccess = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.removedSuccess = false;
          })
      });
    }
    this.removedSuccess = true;

  }

  updateGroup() {
    this.viewMembers = [...this.currentGroupMembers]; // Update viewMembers too

    const { _id, members: previousMemberIds } = this.currentChannel;
    const newMemberIds = this.currentGroupMembers.map(user => user._id);

    fetch(`/api/channel/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        members: newMemberIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          this.updateUserChannel(_id, newMemberIds, previousMemberIds);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  @action closeAlert() {
    this.addedSuccess = false;
    this.removedSuccess = false;
  }

  @action resetCurrentChannel() {
    this.currentChannel = "";
  }

}


const channelStore = new ChannelStore();
export default channelStore;