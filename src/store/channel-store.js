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
  // hard code!
  // @observable unreadSystemMessages = [
  //   {
  //     textType: "invitation",
  //     initiator: message.sender,
  //     targetChannel: "channel._id",
  //     unread: true,
  //   }
  //   ,
  //   {
  //     textType: "decline",
  //     initiator: this.userDict["5bf7ec7d890ad02500b77746"],
  //     targetChannel: "channel._id",
  //     unread: true,
  //   },
  //   {
  //     textType: "addedToGroup",
  //     initiator: this.userDict["5bf8082a67e74429da439f5c"],
  //     targetChannel: "channelName",
  //     unread: true,
  //   },
  //   {
  //     textType: "removedFromGroup",
  //     initiator: "d",
  //     targetChannel: "channelName",
  //     unread: true,
  //   },
  //   {
  //     textType: "removeContact",
  //     initiator: "5bf8082a67e74429da439f5c",
  //     targetChannel: "channelName",
  //     unread: true,
  //   },
  //   {
  //     textType: "makeAdmin",
  //     initiator: "5bf8082a67e74429da439f5c",
  //     targetChannel: "channelName",
  //     unread: true,
  //   }

  // ];
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

    // this.unreadSystemMessageNum=0;
    // this.unreadSystemMessages=[];
    // fetch('/api/system').then(res => res.json()).then(data=>{
    //   applicationStateStore.systemChannel = data.systemChannel;
    //   console.log("systemChannel",applicationStateStore.systemChannel )
    //   Message.find({channel: applicationStateStore.systemChannel}).then(data=>
    //     { console.log(data)
    //       data.forEach(d=>{
    //         console.log(d.text)
    //         let j = d.text.toString().split("&ask&");
    //         console.log(j)
    //         let i = j[1].split("&toJoin&");
    //         let message={}
    //       message.targetChannel= i[1];
    //       message.textType = d.textType;
    //       message.initiator = toJS(channelStore.userDict[j[0]]).name; //sender's name
    //       message.unread = d.unread;
    //       message.sender = j[0]; //sender's id 
    //       channelStore.unreadSystemMessages.push(message);
    //     })
       
    //      channelStore.unreadSystemMessageNum = data.length;
    //     console.log(channelStore.unreadSystemMessages, channelStore.unreadSystemMessageNum);}
    //   );
    //this.setSystemMessages();

    this.myChannels = await Channel.find({
      _id: userStore.user.channel,
    }); // TODO: Added contact doesn't exist yet

    this.myChannels.map(async (c) => {
      let messages = await Message.find({
        channel: c._id
      });
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
        this.sortListByMessageNum()
      }
    });
  }

  setSystemMessages(){
    //console.log(applicationStateStore.systemChannel)
        Message.find({channel: applicationStateStore.systemChannel}).then(data=>
              { console.log(data)
                data.forEach(d=>{
                  console.log("d", d)
                  if(d.textType==="invitation"){
                    let j = d.text.toString().split("&ask&");
                  let i = j[1].split("&toJoin&");
                  let message={}
                message.targetChannel= i[1];
                message.textType = d.textType;
                message.initiator = toJS(this.userDict[j[0]]).name; //sender's name
                message.unread = d.unread;
                message.sender = j[0]; //sender's id 
                this.unreadSystemMessages.push(message);
                  }
                  // if(d.textType==="decline"){
                  //   console.log("decline")
                  // }
                  


              })
             
               this.unreadSystemMessageNum = data.length;
              console.log(this.unreadSystemMessages, this.unreadSystemMessageNum);
          }
            );
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

  createChannel(channelname, admin, members, group, open) {
    let newChannel = {
      channelname: channelname,
      admin: admin,
      members: members,
      favorite: false,
      open: open,
      group: group
    }
    Channel.create(newChannel);
  }

  updateContactChannels(channel) {
    // channel.channelname is "id and id", so we need to get name
    let user = this.getContactName(channel.members);
    channel.channelname = user.name;
    channel.image = user.img;
    this.contactChannels.push(channel);
    this.changeChannel(channel);
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
  @action setAdmin(id) {
    this.adminLeavingError = false;
    this.currentChannelAdmins = [...this.currentChannelAdmins, id];
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

  @action sortListByMessageNum() {
    this.groupChannels = this.groupChannels.sort((a, b) => b.messageNum - a.messageNum);
    this.contactChannels = this.contactChannels.sort((a, b) => b.messageNum - a.messageNum);
  }
}


const channelStore = new ChannelStore();
export default channelStore;