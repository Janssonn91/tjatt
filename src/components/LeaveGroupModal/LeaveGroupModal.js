import './LeaveGroupModal.scss';

@inject('channelStore') export default class LeaveGroupModal extends Component {
  leaveChannel(){
    let channelToLeave = this.props.channelStore.currentChannel;
    this.props.channelStore.exitChannel(channelToLeave);
  }
}