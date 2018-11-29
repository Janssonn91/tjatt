import './SystemMessagesModal.scss';

@inject('userStore', 'channelStore') @observer export default class SystemMessages extends Component {

  invitationDeclined(id, i){
    socket.emit('system', {rejecter: this.props.userStore.user._id, rejectee: id, type:"decline"})
  

    this.props.channelStore.readSystemMessage(id,i);
    
  }
  
  closeSystemMessage(id,i){
    console.log(id, i)
    this.props.channelStore.readSystemMessage(id, i);
  }

}