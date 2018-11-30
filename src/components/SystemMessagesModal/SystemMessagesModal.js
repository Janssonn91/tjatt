import './SystemMessagesModal.scss';

@inject('userStore', 'channelStore') @observer export default class SystemMessages extends Component {

  invitationDeclined(id,mid, i){
    socket.emit('system', {rejecter: this.props.userStore.user._id, rejectee: id, type:"rejection"})
    this.props.channelStore.readSystemMessage(mid,i);
    
  }

  //TODO: invitation confirmed
  
  closeSystemMessage(id,i){
    console.log(id, i)
    this.props.channelStore.readSystemMessage(id, i);
  }

}