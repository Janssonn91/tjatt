import {
  userStore
} from './user-store';
import {
  renderReporter
} from 'mobx-react';
import {
  applicationStateStore
} from './application-state-store';
class ChannelStore {
  //@observable newChannel = [];
  @observable myChannels = [];
  @observable currentChannel = "";
  @observable channelName = "";
  @observable channelImg = "";
  //@observable currentChannelGroup = false; // never used, removable ??
  @observable contactChannels = [];
  @observable groupChannels = [];
  @observable hasLoadedChannels = false;
  @observable currentGroupMembers = [];
  @observable currentGroupCandidates = [];
  @observable hideMenu = true;
  @observable hideChat = false;
  @observable channelChatHistory = [];
  @observable contactImg = "";
  @observable contactChannelname = "";
  @observable userDict = {};
  @observable adminLeavingError = false;
  @observable currentChannelAdmins = []; // holds all the admins of the current group
  @observable channelDict = {};
  @observable unreadSystemMessages = [];
  @observable unreadSystemMessageNum = "";


  //TODO: as a new user, introduction page shows instead of chat page

  getContactName(ids) {
    let n = ids.filter(id => {
      return id !== userStore.user._id
    });
    let u = this.userDict[n[0]];
    return u;
  }

  async getContactUrl(ids) {
    let n = ids.filter(id => {
      return id !== userStore.user._id
    });
    let contact = {};
    if (n[0]) {
      let res = await fetch(`/api/users/${n}`);
      let user = await res.json();
      contact.contactImg = user.image;
      contact.contactChannelname = user.nickname;
      return contact;
    }
  }

  @action async getUserList() {
    let res = await fetch('/api/users');
    let user = await res.json();
    this.setSystemMessagesFromDB();
    user.map((u) => {
      return this.userDict[u._id] = {
        name: u.nickname,
        img: u.image,
        status: false
      };
    });
  }

  @action async getLoginStatus() {
    if (userStore.onLineUsers) {
      for (let id of userStore.onLineUsers) {
        if (this.userDict[id]) {
          this.userDict[id].status = true;
        }
      }
    }
  }

  @action async getChannelList() {
    this.groupChannels = [];
    this.contactChannels = [];
    this.myChannels = [];

    this.myChannels = await Channel.find({
      _id: userStore.user.channel,
    }); // TODO: Added contact doesn't exist yet

    for (let i = 0; i < this.myChannels.length; i++) {
      const c = this.myChannels[i];

      let messages = await Message.find({ channel: c._id });
      let count = 0;
      messages.forEach(message => {
        if (message.sender !== userStore.user._id && message.unread) {
          count++;
        }
      })
      if (c._id !== applicationStateStore.systemChannel) {
        if (c.group) {
          this.channelDict[c._id] = {
            _id: c._id,
            channelname: c.channelname,
            members: c.members,
            admin: c.admin,
            favorite: c.favorite,
            group: c.group,
            open: c.open,
            messageNum: count
          }
          this.groupChannels.push(this.channelDict[c._id]);
        } else {
          let name = this.getContactName(c.members);
          if (name !== undefined) {
            this.channelDict[c._id] = {
              _id: c._id,
              channelname: name.name,
              image: name.img,
              members: c.members,
              admin: c.admin,
              favorite: c.favorite,
              group: c.group,
              open: c.open,
              messageNum: count
            }
            this.contactChannels.push(this.channelDict[c._id]);
          }
          // let n = c.members.filter(id=>{ return id!== userStore.user._id});
          // this.channelDict[c._id] = {_id:c._id, channelname: this.userDict[n].name, image: this.userDict[n].image, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open }
          // this.contactChannels.push(this.channelDict[c._id])
        }
      }
    }
    this.sortListByMessageNum();
    this.hasLoadedChannels = true;
  }

  @action cleanUpOldSystemMessages(){
    this.unreadSystemMessages=[];
    this.unreadSystemMessageNum=0;
  }

  setSystemMessagesFromDB(){
    console.log("systemChannel",applicationStateStore.systemChannel )
    this.cleanUpOldSystemMessages();
        Message.find({channel: applicationStateStore.systemChannel}).then(data=>
         
              { 
                
                data.forEach(d=>{
                  if(d.unread){
                    if(d.textType.toString()==="invitation"){
                      console.log(d._id)
                      let j = d.text.toString().split("&ask&");
                    let i = j[1].split("&toJoin&");
                    let initiator = toJS(this.userDict[j[0]]).name; //sender's name
                    this.setSystemMessageFromDB(initiator, j[0], i[1], d);
               
                    }
                    if(d.textType.toString()==="rejection"){
                      let i = d.text.toString().split("&reject&");
                      let initiator= toJS(this.userDict[i[0]]).name;
                    
                      this.setSystemMessageFromDB(initiator, i[0], "", d);
                    }
                    if(d.textType.toString()==="acceptance"){
                      let j = d.text.toString().split("&accept&");
                      let i = j[1].split("&toJoin&");
                      let initiator = toJS(this.userDict[j[0]]).name;
                      this.setSystemMessageFromDB(initiator, j[0], i[1], d);
                    }
                    if(d.textType.toString()==="addedToGroup"){
                      let i = d.text.toString().split("&inviteYouToChannel&");
                      let initiator = toJS(this.userDict[i[0]]).name;
                      this.setSystemMessageFromDB(initiator, i[0], i[1], d);
                    }
                    if(d.textType.toString()==="removeFromGroup"){
                      let i = d.text.toString().split("&hasRemovedYouFromChannel&");
                      let initiator = toJS(this.userDict[i[0]]).name;
                      this.setSystemMessageFromDB(initiator, i[0], i[1], d);
                    }
                  }
                 
                  
              })
              console.log(toJS(this.unreadSystemMessages), this.unreadSystemMessageNum)
          }
         
            );
  }

  setSystemMessageFromDB(initiator, sender, targetChannel, d){
    let message={}
    message.id = d._id;
    message.targetChannel= targetChannel;
    message.textType = d.textType;
    message.initiator = initiator; //sender's name
    message.unread = true;
    message.sender = sender; //sender's id 
    this.unreadSystemMessages.push(message);
   this.unreadSystemMessageNum++;

  }

  readSystemMessage(id, i){
    console.log(id,i)
    let c = toJS(this.unreadSystemMessages)
    c.splice(i, 1);
    this.unreadSystemMessages= c;
    this.unreadSystemMessageNum--;
    if(id){
      id=id.toString();

      fetch(`/api/message/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          unread: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
    }
    


   
  }

  getGroupMembersData(memberIds) {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const isGroupMember = (userId) => {
          return memberIds.some(id => userId === id);
        }
        const existInMyContact = (userId) => {
          return userStore.user.contact.some(contactId => userId === contactId);
        }
        this.currentGroupMembers = users.filter(user => isGroupMember(user._id));
        const nonMembers = users.filter(user => !isGroupMember(user._id));
        this.currentGroupCandidates = nonMembers.filter(user => existInMyContact(user._id));
      });
  }

  @action async changeChannel(channel) {
    console.log(channel)
    this.currentChannel = channel;
    this.currentChannel.messageNum = 0;
    console.log("channelname", this.currentChannel)

    this.showChat();
    this.getChannelChatHistory(this.currentChannel._id);
    this.getLoginStatus();

    this.currentChannelAdmins = [];
    this.ChannelChatHistory = [];

    let admin = [];
    if (typeof (channel.admin) === "string") {
      admin.push(channel.admin);
      this.currentChannelAdmins.push(channel.admin);
    } else {
      admin = channel.admin;
      this.currentChannelAdmins = channel.admin;
    }
    let element = "";
    if (!channel.group) {
      const name = this.getContactName(channel.members);
      this.channelName = name.contactChannelname;
    } else {
      this.getGroupMembersData(channel.members);
      this.channelName = channel.channelname;
    }
  }

  async getChannelChatHistory(id) {
    console.log("changeChannel", id)
    this.channelChatHistory = [];
    this.channelChatHistory = await Message.find({
      channel: id
    });
    this.channelChatHistory.forEach(message => {
      if (message.unread) {
        fetch(`/api/message/${message._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            unread: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
      }
    })
  }

  async createChannel(channelname, admin, members, group, open) {
    let newChannel = {
      channelname: channelname,
      admin: admin,
      members: members,
      favorite: false,
      open: open,
      group: group
    }
    // preparing for checking if a channel with those exact two members already exists so we don't create a new channel for them

    // res = 
    // {type: "basic", url: "http://localhost:3000/api/checkChannel/5bfe751d3e85090c38953248,5bfe75273e85090c3895324a", redirected: false, status: 200, ok: true, …}
    //  if(!group){
    //   const checkIfChannelExits = await fetch(`api/checkChannel/${members}`);
    //   console.log(checkIfChannelExits);
    // }
    Channel.create(newChannel);
  }

  @action async updateContactChannels(c, id) {
   let channel={};
   let user = this.userDict[id];
   fetch(`/api/channel/${c}`).then(res=>res.json()).then(data=>{
     channel= data;
     channel.channelname = user.name;
     channel.image = user.img;
     this.contactChannels.push(channel);
     
  })

   
    
    //this.changeChannel(channel);
  }

  @action showMenu() {
    this.hideMenu = false;
    this.hideChat = true;
  }

  @action showChat() {
    this.hideMenu = true;
    this.hideChat = false;
  }

  // for setting new admin on frontend
  //channel is the whole channel
  @action setAdmin(id, channel) {
    this.adminLeavingError = false;
    this.currentChannelAdmins = [...this.currentChannelAdmins, id];
    let message={
      sender: userStore.user._id,
      admin: id,
      targetChannel: channel,
      type: "makeAdmin",
    }
    socket.emit('system', message);
  }

  @action showAdminLeaveError() {
    this.adminLeavingError = true;
  }

  @action hideAdminLeaveError() {
    this.adminLeavingError = false;
  }

  // for splicing a channel from a user. Needs an index to start from
  @action spliceChannel(channelId
  ) {
    let index = 0;
    for(let channel of this.contactChannels){
      if(channel._id === channelId){
        this.contactChannels.splice(index, 1);
      }
      index ++;
    };
    let myChannelIndex = 0;
    for(let channel of this.myChannels){
      if(channel._id === channelId){
        this.myChannels.splice(myChannelIndex,1)
      }
      myChannelIndex++;
    }
 
    this.ChannelChatHistory = [];
    this.currentChannel = '';
    this.channelName = '';
  }

  // for splicing an admin from a group. Needs an index to start from
  @action spliceAdmin(i) {
    this.currentChannelAdmins.splice(i, 1);
  }

  @action resetCurrentChannel() {
    this.currentChannel = "";
  }

  // TODO: This function has warning (Nana)
  @action sortListByMessageNum() {
    this.groupChannels = this.groupChannels.sort((a, b) => b.messageNum - a.messageNum);
    this.contactChannels = this.contactChannels.sort((a, b) => b.messageNum - a.messageNum);
  }

  @action moveLatestChannelToTop(channelID) {
    // For contact list
    const targetChannel = this.contactChannels.find(channel => channelID === channel._id);
    const index = this.contactChannels.indexOf(targetChannel);
    if (index > 0) {
      this.contactChannels.splice(index, 1);
      this.contactChannels.unshift(targetChannel);
    }
    // For group list
    const targetGroupChannel = this.groupChannels.find(channel => channelID === channel._id);
    const groupindex = this.groupChannels.indexOf(targetGroupChannel);
    if (groupindex > 0) {
      this.groupChannels.splice(groupindex, 1);
      this.groupChannels.unshift(targetGroupChannel);
    }
  }
}


const channelStore = new ChannelStore();
export default channelStore;