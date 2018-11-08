import './AddDeleteMemberModal.scss';

@inject('loginStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable error = false;

  updateGroup() {
    //check if groupMember.length is large than 2
    if (this.props.channelStore.currentGroupMembers.length <= 2) {
      this.error = true;
      return;
    }
    this.error = false;

  }
}