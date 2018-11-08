import './ViewMembersModal.scss';

@inject('loginStore', 'channelStore') 
@observer export default class ViewMembersModal extends Component {
  
  @observable currentChannel = this.props.channelStore.currentChannel;
  @observable channelAdmins = this.currentChannel.admin;

  testbtn(){
    // funkar visa admin men måste refresha...
    console.log(toJS(this.props.channelStore.currentGroupMembers));
    console.log(toJS(this.props.channelStore.currentChannel));
    console.log(toJS(this.channelAdmins));
  }

}