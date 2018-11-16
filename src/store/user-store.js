import loginStore from './channel-store';
import channelStore from './channel-store';

class UserStore {
  @observable myContacts = []; //Sidebar, channel-store
  @observable groupCandidates = []; //CreateGroupModal

  @action setMyContactsAndGroupCandidates(myContacts, groupCandidates) {
    this.myContacts = myContacts;
    this.groupCandidates = groupCandidates;
  }

  @action updateMyContactsAndGroupCandidates(addedUser) {
    this.myContacts.push(addedUser);
    this.groupCandidates.push(addedUser);
  }

}

export const userStore = new UserStore();