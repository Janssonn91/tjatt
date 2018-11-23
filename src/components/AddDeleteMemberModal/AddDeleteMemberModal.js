import './AddDeleteMemberModal.scss';
import ScrollableFeed from 'react-scrollable-feed';

@inject('userStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable showConfirmation = false;
  @observable addedSuccess = false;
  @observable removedSuccess = false;

  closeAlert() {
    this.addedSuccess = false;
    this.removedSuccess = false;
  }

  async closeModal() {
    await sleep(1500);
    if (this.addedSuccess && this.removedSuccess) {
      this.props.toggle();
      this.props.channelStore.getChannelList();
      this.closeAlert();
      this.showConfirmation = false;
    }
  }

  searchCandidates = (e) => {
    const regex = new RegExp(e.target.value, 'i');
    this.props.channelStore.searchCandidates(regex);
  }

  updateUserChannel(channelId, newMemberIds, previousMemberIds) {
    const wasMember = user => previousMemberIds.some(id => id === user);
    const isMember = user => newMemberIds.some(id => id === user);
    const addedUser = newMemberIds.filter(user => !wasMember(user));
    const removedUser = previousMemberIds.filter(user => !isMember(user));

    if (addedUser.length > 0) {
      addedUser.forEach(id => {
        fetch(`/api/users/${id}/add`, {
          method: 'PUT',
          body: JSON.stringify({
            channel: channelId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(result => {
            if (result.succes) {
              this.addedSuccess = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.addedSuccess = false;
          })
      });
    }
    this.addedSuccess = true;

    if (removedUser.length > 0) {
      removedUser.forEach(id => {
        fetch(`/api/users/${id}/remove`, {
          method: 'PUT',
          body: JSON.stringify({
            channel: channelId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(result => {
            if (result.succes) {
              this.removedSuccess = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.removedSuccess = false;
          })
      });
    }
    this.removedSuccess = true;
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
          this.updateUserChannel(_id, newMemberIds, previousMemberIds);
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