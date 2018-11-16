import loginStore from './channel-store';
import channelStore from './channel-store';

class UserStore {
  @observable myContacts = []; //Sidebar, channel-store
  @observable groupCandidates = []; //CreateGroupModal
  @observable selectedGroupMember = []; // CreateGroupModal, channel-store


  @action setMyContactsAndGroupCandidates(myContacts, groupCandidates) {
    this.myContacts = myContacts;
    this.groupCandidates = groupCandidates;
  }

  @action updateMyContactsAndGroupCandidates(addedUser) {
    this.myContacts.push(addedUser);
    this.groupCandidates.push(addedUser);
  }

  @action cleanUpGroupModal() {
    this.selectedGroupMember.forEach((data) => {
      this.groupCandidates.push(data);
    });
    this.selectedGroupMember = [];
  }

  @action selectOneForGroup(user) {
    this.selectedGroupMember.push(user);
    const addedUser = this.groupCandidates.find(u => u._id === user._id);
    const index = this.groupCandidates.indexOf(addedUser);
    this.groupCandidates.splice(index, 1);
  }

  @action removeFromSelect(user) {
    this.groupCandidates.push(user);
    const addedUser = this.selectedGroupMember.find(u => u._id === user._id);
    const index = this.selectedGroupMember.indexOf(addedUser);
    this.selectedGroupMember.splice(index, 1);
  }
}

export const userStore = new UserStore();