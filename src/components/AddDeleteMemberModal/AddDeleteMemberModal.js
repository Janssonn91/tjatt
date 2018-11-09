import './AddDeleteMemberModal.scss';
import ScrollableFeed from 'react-scrollable-feed';

@inject('loginStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable error = false;
  @observable showConfirmation = false;

  async reallyUpdateGroup() {
    this.props.channelStore.updateGroup();
    await sleep(500)
    this.showConfirmation = false;
  }

  updateGroup() {
    if (this.showConfirmation) {
      this.reallyUpdateGroup();
    }
    //check if groupMember.length is large than 2
    if (this.props.channelStore.currentGroupMembers.length <= 2) {
      this.error = true;
      return;
    }
    this.error = false;
    this.showConfirmation = true;
  }
}