import channelStore from './channel-store';

class LoginStore {
  @observable user = { channel: [], contact: [] }; //Login.js: behövs vara här
  @observable isLoggedIn = false; //Login.js, Sidebar.js, Signup.js: behövs vara här
  @observable checkedLoginState = false;
  // @observable loginError = false; //används bara i Login.js => move to Login.js
  // @observable usernameExits = false; //används i Signup.js => move to Signup.js
  @observable onLineUsers = []; //Ta data i Login.js och används i ChatMessage.js

  // Flytta till UserStore? behövs i store eftersom de data behövs från olika component
  // @observable candidates = []; //AddUserModal
  // @observable myContacts = []; //Sidebar, channel-store
  // @observable groupCandidates = []; //CreateGroupModal

  // @observable selectedGroupMember = []; // CreateGroupModal, channel-store


  // Move to updateSettingsModal
  // @observable isNotCorrectPass = false;
  // @observable savedNickname = false;
  // @observable savedPassword = false;
  // @observable areAllEmpty = false;

  // @observable myChannel = [];
  // @observable receivedMessages = [];
  @observable isLoading = true;
  // @observable myGroups = [];

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

  @action updateProfile(setting) {
    this.user = { ...this.user, setting };
  }

  @action logout() {
    this.isLoggedIn = false;
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
          socket.emit('login', this.user._id)
          socket.on('online', message => {
            console.log('online', message)
            this.onLineUsers = message.loginUser;
          })
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

}

export const loginStore = new LoginStore();
