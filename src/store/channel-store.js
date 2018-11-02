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
    @observable contactChannel = [];
    @observable groupChannel = [];
    @observable hideMenu = true;
    @observable hideChat = false;
 



  //TODO: as a new user, introduction page shows instead of chat page

  @action async getChannels() {
    //console.log(loginStore.user.channel)
    let channels = loginStore.user.channel;
    console.log(channels)
   
    let cs = await Channel.find({
      _id: channels
    })

    this.myChannels = cs;
    console.log(this.myChannels)
    
    this.myChannels.forEach(
          channel => {
            if (channel.group === false) {
              console.log("false")
              this.contactChannel.push(channel);
            }
            if (channel.group === true){
              console.log("true")
              this.groupChannel.push(channel);
            }
          }

        );
        console.log(this.myChannels)
        this.renderGroup();
      }

  

  @action renderGroup() {

    let channels = this.groupChannel;
    let elements = [];
    let element = '';
    // console.log(channels)
    channels.map((channel, i) => {
      // console.log(channel.channelname)
      element = <div key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={() => this.getGroupChannel(channel)}>
        <div className="d-inline-block" >{channel.channelname}</div>
      </div>
      elements.push(element)
    })
     ReactDOM.render(elements, document.getElementById('groupRender'));

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

  @action cleanUpGroupModal(){
    // TODO: cleanup has bug, remove new added contact need to be fixed
    // need new method to renew groupCandidates
    loginStore.selectedGroupMember = [];
    //loginStore.fetchContact();
}


  @action updateContactChannel() {
    this.contactChannel.push(this.newChannel);
  }

  @action updateGroupChannel() {
    //console.log(this.myChannels, this.newChannel)
    this.groupChannel.push(this.newChannel);
    //this.myChannels.push(this.newChannel);
    console.log(this.groupChannel);
    this.renderGroup();
    this.getGroupChannel(this.newChannel);
  }

  @action async getChannelByUser(userId) {
    this.currentChannel = "";
    this.channelName = "";
    this.channelImg = "";
    // this.currentChannelType = "";
    console.log(this.contactChannel)
    this.contactChannel.map(channel => {
      channel.admin.map(data => {
        if (data === userId) {
          console.log(channel)
          return this.currentChannel = channel;
        }
      })
    })
    this.showChat();
    //this.getChannels();
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