import channelStore from './channel-store';
import { applicationStateStore } from "./application-state-store";

class UserStore {
  @observable user = { _id: "", channel: [], contact: [] };
  @observable isLoggedIn = false;
  @observable candidates = []; // AddUserModal
  @observable groupCandidates = []; //CreateGroupModal (groupCandidates mean myContacts)
  @observable selectedGroupMember = []; // CreateGroupModal, channel-store
  @observable isLoading = true;
  @observable myStars = [];

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

  @action updateMyContact(userId) {
    const addedUser = this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);
    this.groupCandidates.push(addedUser);
  }

  @action async moveContactToCandidates(id) {
    let res = await fetch(`/api/users/${id}`);
    let user = await res.json();
    this.candidates.push(user);
  }

  @action updateProfile(key, val) {
    this.user = { ...this.user, [key]: val };
  }

  @action logout() {
    this.isLoggedIn = false;

  }

  @action fetchContact() {
    this.candidates = [];
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        let withoutMe = users.filter(user => user._id !== this.user._id);
        withoutMe = withoutMe.filter(user => user._id !== applicationStateStore.systemId.toString());

        const isIncludedInContact = (userId) => {
          return this.user.contact.some(contactId => userId === contactId);
        }
        this.groupCandidates = withoutMe.filter(user => isIncludedInContact(user._id)); //use in CreateGroupModal
        let withPending = withoutMe.filter(user => !isIncludedInContact(user._id)); //use in AddUserModal

        withPending.forEach(u => {
          if (!toJS(channelStore.pendingUsers).includes(u._id)) {
            this.candidates.push(u);
          }
        })

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

  @action async fetchStars() {
    this.myStars = [];
    fetch(`/api/users/${this.user._id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(user => {
        if (user.star) {
          user.star.forEach(starId => {
            fetch(`/api/message/${starId}`, {
              method: 'GET'
            })
              .then(res => res.json())
              .then(message => {
                if(message.success){
                  this.myStars.push(message.message);
                  console.log("my star", this.myStars)
                }
                
              });
          });
        }
      });
    await sleep(1000);
    this.sortMyStars();
  }

  @action sortMyStars() {
    this.myStars = this.myStars.slice().sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
  }

  // update star of user in backend
  updateStar() {
    let starIds = [];
    starIds = this.myStars.map(star => star._id);

    fetch(`/api/users/${this.user._id}/star`, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({ star: starIds }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          console.log('updated star');
        }
      })
      .catch(err => console.log(err));
  }

  // update myStars array in frontend
  @action updateMyStars(message, star) {
    if (!star) {
      this.myStars.push(message);
    } else {
      const index = this.myStars.indexOf(this.myStars.find(s => s._id === message._id));
      this.myStars.splice(index, 1);
    }
    this.sortMyStars();
    this.updateStar();
  }

}

export const userStore = new UserStore();