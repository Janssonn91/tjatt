import './SystemMessagesModal.scss';

@inject('userStore', 'channelStore') @observer export default class SystemMessages extends Component {

  invitationDeclined(id, i){

    let data={
      rejecter: this.props.userStore.user._id,
      rejectee: id,
    }
    socket.emit('decline', data);

    this.props.channelStore.readSystemMessage(id,i);
    // let data = {
    //   initiator: this.userStore.user,
    //   decline: id,
    // }

   //socket.emit('decline', data);
  }
}