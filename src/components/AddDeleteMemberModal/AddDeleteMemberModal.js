import './AddDeleteMemberModal.scss';
import ScrollableFeed from 'react-scrollable-feed';

@inject('userStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable showConfirmation = false;

  async closeModal() {
    await sleep(1500);
    if (this.props.channelStore.addedSuccess && this.props.channelStore.removedSuccess) {
      this.props.toggle();
      this.props.channelStore.getChannelList();
      //this.props.channelStore.getChannels();
      this.props.channelStore.closeAlert();
      this.showConfirmation = false;
    }
  }

  searchCandidates = (e) => {
    const regex = new RegExp(e.target.value, 'i');
    this.props.channelStore.searchCandidates(regex);
  }

  async reallyUpdateGroup() {
    await sleep(300);
    this.showConfirmation = false;

    const { channelStore } = this.props;
    channelStore.viewMembers = [...channelStore.currentGroupMembers]; // Update viewMembers too
    const { _id, members: previousMemberIds } = channelStore.currentChannel;
    const newMemberIds = channelStore.currentGroupMembers.map(user => user._id);

    fetch(`/api/channel/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        members: newMemberIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          channelStore.updateUserChannel(_id, newMemberIds, previousMemberIds);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.closeModal();
  }

  updateGroup() {
    if (this.showConfirmation) {
      this.reallyUpdateGroup();
    }
    this.showConfirmation = true;
  }


  scrollToBottom = () => {
    this.selectedMemberEnd.scrollIntoView({ behavior: "smooth" })
  };
}