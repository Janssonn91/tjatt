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
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable channelChatHistory = [];
  @observable contactImg = "";
  @observable contactChannelname = "";
  @observable userDict = {};
  @observable adminLeavingError = false;



  //TODO: as a new user, introduction page shows instead of chat page

  @action async getChannels() {
    this.myChannels = [];
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
    this.myChannels.map((channel) => {
      return socket.emit('join channel', channel._id)
    });
  }


  renderChannels() {
    this.renderChannelElements(this.groupChannels, 'group', 'groupsRender');
    this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
  }

  async renderChannelElements(channels, type, anchor) {
    console.log(channels)
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

  @action async getUserList(){
    let res = await fetch('/api/users');
    let user = await res.json();
    user.map((u) => {
      return this.userDict[u._id] = { name: u.nickname, img: u.image }
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
      });
  }

  @action async changeChannel(channel) {
    console.log("changeChannel", channel)
    this.ChannelChatHistory = [];
    this.currentChannel = channel;
    this.currentChannelGroup = channel.group;
    this.showChat();
    this.getChannelChatHistory(channel);
    let admin = [];
    if (typeof (channel.admin) === "string") {
      admin.push(channel.admin);
      console.log(admin)
    } else {
      admin = channel.admin;
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
    window.history.pushState(null, null, "/" + loginStore.user.username + "/" + this.channelName);
  }

  async getChannelChatHistory(channel) {
    console.log(channel)
    this.channelChatHistory = [];
    this.channelChatHistory = await Message.find({
      channel: channel._id
    });
    console.log(this.channelChatHistory)
    // this.renderChatMessage();
  }

  // @action renderChatMessage(){
  //   let element = this.channelChatHistory.map((message, i) => {
  //     return (
  //       message.sender === (loginStore.user._id) ?
  //         <li key={i} className="clearfix">
  //           <div className="me">
  //             <span>
  //               <img alt="user-img" src={loginStore.user.image || "/images/placeholder.png"} />
  //             </span>&nbsp;&nbsp;
  //             <span className="message-data-name">
  //               {loginStore.user.nickname}
  //             </span>&nbsp;
  //             {/* <span className="message-data-time">{message.time}</span> */}
  //           </div>
  //           <div className="message my-message">
  //             {message.text}
  //           </div>
  //         </li> :
  //         <li key={i} className="clearfix">
  //           <div className="message-data">
  //             {
  //               message.status === "online" ?
  //             <span className="online circle">
  //               <i className="fas fa-circle"></i>
  //             </span> :
  //             <span className="offline circle">
  //               <i className="fas fa-circle"></i>
  //             </span>
  //             }&nbsp; &nbsp;
  //             <span>
  //               <img alt="user-img" src={message.image || "/images/placeholder.png"}/>
  //             </span>&nbsp; &nbsp;
  //             <span className="message-data-name">{message.sender}</span>
  //             {/* <span className="message-data-time">{message.time}</span> */}
  //           </div>
  //           <div className="message other-message">
  //             {message.text}
  //           </div>
  //         </li>
  //       )
  //     })
  //     ReactDOM.render(element, document.getElementById("chatHistory"));
  //   }



  @action createChannel(channelname, admin, members, group) {
    this.newChannel = {
      channelname: channelname,
      admin: admin,
      members: members,
      favorite: false,
      open: true,
      group: group
    }


    return Channel.create(this.newChannel).then(data=>console.log("!!!!!!",data));
  }

  @action async createGroup(groupName) {
    const admin = loginStore.user._id;
    const members = loginStore.selectedGroupMember.map(user => user._id);
    members.push(admin);
    this.createChannel(groupName, admin, members, true);
    await sleep(60);
    Channel.find({channelname: groupName}).then(channel => {
      console.log("lllllllllll",channel)
      this.changeChannel(channel[0]);
        socket.emit('join channel', channel[0]._id);
         this.updateGroupChannel(channel[0]);
        channel[0].members.forEach(member => {
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
    //await this.getChannels();
    this.renderChannelElements(this.contactChannels, 'contact', 'contactsRender');
    //this.props.channelStore.getChannelByUser(user._id)}
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
      //  this.getChannels();
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

  @action setAdmin(newAdminId){
    this.adminLeavingError = false;
    this.currentChannel.admin = [...this.currentChannel.admin, newAdminId];
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

  @action showAdminLeaveError(){
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
    this.renderChannels();

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
      if(this.amIAdmin){
        this.removeAdmin(userId, channel);
      }
  }

  removeAdmin(id, channel){
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

}


const channelStore = new ChannelStore();
export default channelStore;