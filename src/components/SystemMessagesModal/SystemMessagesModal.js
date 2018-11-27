import './SystemMessagesModal.scss';

@inject('userStore', 'channelStore') @observer export default class SystemMessages extends Component {

  invitationDeclined(id){
    console.log(id)
    let data={
      rejecter: this.props.userStore.user._id,
      rejectee: id,
    }
    socket.emit('decline', data)
    // let data = {
    //   initiator: this.userStore.user,
    //   decline: id,
    // }

   //socket.emit('decline', data);
  }
}