import channelStore from './channel-store';

class LoginStore {
  @observable user = { channel: [], contact: [] }; //Login.js: behövs vara här
  @observable isLoggedIn = false; //Login.js, Sidebar.js, Signup.js: behövs vara här
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

}

export const loginStore = new LoginStore();
