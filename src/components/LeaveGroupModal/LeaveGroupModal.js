import './LeaveGroupModal.scss';

@inject('channelStore', 'userStore') export default class LeaveGroupModal extends Component {

  leaveChannel(){
    const channel = this.props.channelStore.currentChannel;

    for (let channelArr of this.props.channelStore.myChannels) {
      if (channelArr._id === channel._id) {
        const index = channel.members.indexOf(this.props.userStore.user._id);
        if (index > 0) {
          channel.members.splice(index, 1);
        };
      }
    }

    //send message to group chat
    let message={
      sender: this.props.userStore.user._id,
      channel: this.props.channelStore.currentChannel,
      type: "leaveGroup",
    }
    socket.emit('system', message);
  
    // remove the channel from the user and re-render users channels
    let i = 0;
    for (let channelArr of this.props.channelStore.groupChannels) {
      if (channelArr._id === channel._id) {
        this.props.channelStore.spliceChannel(i);
      }
      i++;
    }
    //this.props.channelStore.renderChannels();

    // remove both channel from user and user from channel in backend
    const userId = this.props.userStore.user._id;
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
    if (this.props.channelStore.currentChannelAdmins.includes(this.props.userStore.user._id)) {
      
      //send message to group chat
      // if new feature "remove admin"
    let message={
      sender: this.props.userStore.user._id,
      admin: this.props.userStore.user._id,
      channel: channel,
      type: "removeAdmin",
    }
    socket.emit('system', message);
      
      this.removeAdmin(userId, channel);
    }
    if (this.props.channelStore.currentGroupMembers.length === 1) {
      this.deleteGroup(channel);
    }
    window.history.pushState(null, null, '/' + this.props.userStore.user.username);
    this.props.toggle();
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
    let index = this.props.channelStore.currentChannelAdmins.indexOf(id);
    this.props.channelStore.spliceAdmin(index);

  
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

}