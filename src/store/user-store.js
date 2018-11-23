import channelStore from './channel-store';
import { applicationStateStore } from "./application-state-store";

class UserStore {
  @observable user = {_id:"", channel: [], contact: [] };
  @observable isLoggedIn = false;
  @observable checkedLoginState = false;
  @observable candidates = []; // AddUserModal
  @observable groupCandidates = []; //CreateGroupModal (groupCandidates mean myContacts)
  @observable selectedGroupMember = []; // CreateGroupModal, channel-store
  @observable isLoading = true;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  @action pageLoad(time = 1000) {
    this.isLoading = true;
    setTimeout(() => {
      return this.isLoading = false
    }, (time))
  }

  @action.bound setUserAndIsLoggedIn(userdata) {
    const { user, isLoggedIn } = userdata;
    this.user = user;
    this.isLoggedIn = isLoggedIn;
  }

  @action checkState() {
    this.checkedLoginState = true;
  }

  @action updateMyContact(userId) {
    const addedUser = this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);
    this.groupCandidates.push(addedUser);
  }

  @action updateProfile(key, val) {
    this.user = { ...this.user, [key]: val };
  }

  @action logout() {
    this.isLoggedIn = false;
  }

  @action fetchContact() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const withoutMe = users.filter(user => user._id !== this.user._id);

        const isIncludedInContact = (userId) => {
          return this.user.contact.some(contactId => userId === contactId);
        }
        this.candidates = withoutMe.filter(user => !isIncludedInContact(user._id)); //use in AddUserModal
        this.groupCandidates = withoutMe.filter(user => isIncludedInContact(user._id)); //use in CreateGroupModal
      });
  }

  @action cleanUpGroupModal() {
    this.selectedGroupMember.forEach((data) => {
      this.groupCandidates.push(data);
    });
    this.selectedGroupMember = [];
  }

  @action selectOneForGroup(user) {
    this.selectedGroupMember.push(user);

  }

  @action removeFromSelect(user) {
    const addedUser = this.selectedGroupMember.find(u => u._id === user._id);
    const index = this.selectedGroupMember.indexOf(addedUser);
    this.selectedGroupMember.splice(index, 1);
  }
}

export const userStore = new UserStore();