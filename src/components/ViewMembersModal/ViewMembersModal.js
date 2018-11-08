import './ViewMembersModal.scss';

@inject('loginStore', 'channelStore') 
@observer export default class ViewMembersModal extends Component {
  
  testbtn(){
    console.log(toJS(this.props.channelStore.currentGroupMembers));
    console.log(toJS(this.props.channelStore.currentChannel));
    console.log(toJS(this.channelAdmins));
    console.log(this.props.channelStore.currentChannel.admin);
  }

}