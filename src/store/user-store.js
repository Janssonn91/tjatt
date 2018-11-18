import channelStore from './channel-store';
import { applicationStateStore } from "./application-state-store";

class UserStore {
  @observable user = { channel: [], contact: [] };
  @observable isLoggedIn = false;
  @observable checkedLoginState = false;
  @observable onLineUsers = [];
  @observable candidates = [];
  @observable myContacts = []; //Sidebar, channel-store
  @observable groupCandidates = []; //CreateGroupModal
  @observable selectedGroupMember = []; // CreateGroupModal, channel-store
  @observable isLoading = true;

  constructor() {
    console.log('login-store här?????');
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

  @action checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          this.user = res.user;
          this.isLoggedIn = true;
          this.fetchContact();
          socket.emit('login', this.user._id)
          applicationStateStore.fetchUser();

          // socket.on('online', message => {
          //   console.log('online', message)
          //   this.onLineUsers = message.loginUser;
          // })
          socket.off('chat message');
          socket.on(
            'chat message',
            (messages) => {
              for (let message of messages) {
                let date = new Date();
                if (message.channel === channelStore.currentChannel._id) {
                  channelStore.channelChatHistory.push(
                    {
                      channel: message.channel,
                      sender: message.sender,
                      star: false,
                      text: message.text,
                      textType: message.textType,
                      time: date
                    }
                  )
                }
              }
            })
          socket.on('sign up', message => {
            channelStore.getUserList();
          })
          socket.on('login', message => {
            this.onLineUsers = message.loginUser;
          })
          socket.on('logout', message => {
            this.onLineUsers = message.loginUser;
          })
        }
        socket.on('message', event => {
          console.log('Message from server ', event);
        })
        this.checkedLoginState = true;
      }).catch(err => {
        console.log("err", err)
      });
  }

  @action updateMyContact(userId) {
    const addedUser = this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);
    this.myContacts.push(addedUser);
    this.groupCandidates.push(addedUser);

    this.props.channelStore.renderChannelElements(this.props.channelStore.contactChannels, 'contact', 'contactsRender');
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
        this.myContacts = withoutMe.filter(user => isIncludedInContact(user._id)); //use in Sidebar
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