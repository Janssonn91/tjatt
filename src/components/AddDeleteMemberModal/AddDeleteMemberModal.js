import './AddDeleteMemberModal.scss';
import ScrollableFeed from 'react-scrollable-feed';

@inject('loginStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable error = false;
  @observable showConfirmation = false;

  async closeModal() {
    await sleep(1500);
    if (this.props.channelStore.addedSuccess && this.props.channelStore.removedSuccess) {
      this.props.toggle();
      this.props.channelStore.getChannels();
      this.props.channelStore.closeAlert();
      this.showConfirmation = false;
    }
  }

  async reallyUpdateGroup() {
    await sleep(300);
    this.showConfirmation = false;
    this.props.channelStore.updateGroup();
    this.closeModal();
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

  scrollToBottom = () => {
    this.selectedMemberEnd.scrollIntoView({ behavior: "smooth" })
  };
}