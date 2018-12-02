import './AddDeleteMemberModal.scss';
import ScrollableFeed from 'react-scrollable-feed';

@inject('userStore', 'channelStore') @observer
export default class AddDeleteMemberModal extends Component {

  @observable showConfirmation = false;
  @observable addedSuccess = false;
  @observable removedSuccess = false;
  @observable searchedGroupCandidates = [];
  @observable groupMembers = [];


  // "currentGroupMembers" is empty until user select one channel
  // That's why we cannot set the value start(), but we can get value if we use shouldComponentUpdate()
  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      // copy members because "currentGroupMembers" is used in ViewMembersModal
      this.groupMembers = [...nextProps.channelStore.currentGroupMembers];
      // copy candidates because we need to reset with "currentGroupCandidates" in store when we close the modal or
      this.searchedGroupCandidates = [...this.props.channelStore.currentGroupCandidates];
      return true;
    }
    return false;
  }

  checkboxHandler = (e) => {
    if (e.target.checked) {
      this.searchedGroupCandidates = [...this.props.channelStore.currentGroupCandidates];
    } else {
      this.searchedGroupCandidates = [];
    }
  }

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
    this.searchedGroupCandidates = this.props.channelStore.currentGroupCandidates.filter(user => {
      return regex.test(user.nickname) || regex.test(user.username) || regex.test(user.email)
    })
  }

  updateUserChannel(channelId, newMemberIds, previousMemberIds) {
    const wasMember = user => previousMemberIds.some(id => id === user);
    const isMember = user => newMemberIds.some(id => id === user);
    const addedUser = newMemberIds.filter(user => !wasMember(user));
    const removedUser = previousMemberIds.filter(user => !isMember(user));
    // Update view
    this.props.channelStore.getGroupMembersData(newMemberIds);

    if(addedUser.length>0 || removedUser.length>0){
      let m={
        targetChannel: this.props.channelStore.currentChannel,
        initiator: this.props.userStore.user._id,
        addedMembers: addedUser,
        removedMembers: removedUser,
        type: "editMembersInGroup"
      }
      socket.emit('system',m);
    }

    



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
    const { _id, members: previousMemberIds } = channelStore.currentChannel;
    const newMemberIds = this.groupMembers.map(user => user._id);

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
          this.closeModal();
        }
      })
      .catch(err => {
        console.log(err);
      });
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

  selectOneForGroup(user) {
    this.groupMembers.unshift(user);
    const addedUser = this.searchedGroupCandidates.find(u => u._id === user._id);
    const index = this.searchedGroupCandidates.indexOf(addedUser);
    this.searchedGroupCandidates.splice(index, 1);
  }

  removeFromSelect(user) {
    this.searchedGroupCandidates.unshift(user);
    const addedUser = this.groupMembers.find(u => u._id === user._id);
    const index = this.groupMembers.indexOf(addedUser);
    this.groupMembers.splice(index, 1);
  }
}