import './SystemMessagesModal.scss';

@inject('userStore', 'channelStore') @observer export default class SystemMessages extends Component {

  invitationDeclined(id, targetChannel, mid, i){
    socket.emit('system', {rejecter: this.props.userStore.user._id, rejectee: id, type:"rejection"})
    this.props.channelStore.readSystemMessage(mid,i);
    fetch(`/api/killChannel/${targetChannel}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(channel => console.log(channel))
      .catch(err => {
        console.log(err);
      });

  }

  invitationAccepted(id, targetChannel, mid, i){
    socket.emit('system', {accepter: this.props.userStore.user._id, acceptee: id, targetChannel: targetChannel, type:"acceptance" })
    this.props.channelStore.readSystemMessage(mid,i);

    this.props.channelStore.updateContactChannels(targetChannel, id);
    let myId = this.props.userStore.user._id;
     // add contact into my contact
      fetch(`/api/users/${myId}`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: myId, contact: id, channel: targetChannel
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(() => {
          // remove added user in candidates and add the user in myContacts in user-store
          this.props.userStore.updateMyContact(id);
        })
        .catch(err => {
          console.log(err);
        });

     // add my id into the new friend contact
      fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
          _id: id, contact: myId, channel: targetChannel }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
  }


  
  closeSystemMessage(id,i){
    this.props.channelStore.readSystemMessage(id, i);
  }

}