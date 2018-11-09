import './ViewMembersModal.scss';

@inject('loginStore', 'channelStore') 
@observer export default class ViewMembersModal extends Component {
  
  // måste spärra i renderingen så bara admin kan få se knappar om att lägga till admin
  // make admin knapp ska bara renderas en gång på de som kan bli det
  setNewAdmin(e, userId){
    //console.log(toJS(this.props.channelStore.currentGroupMembers));
    //console.log(toJS(this.props.channelStore.currentChannel));
    //console.log(this.props.channelStore.currentChannel.admin);
    this.props.channelStore.setAdmin(userId);
    this.forceUpdate();
  }

}