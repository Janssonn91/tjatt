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
  @observable message = '';
  // @observable receivedMessages = [];
  @observable isNotCorrectPass = false;
  @observable savedNickname = false;
  @observable savedPassword = false;
  @observable areAllEmpty = false;
  @observable onLineUsers = [];
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

  @action updateSettings(settings) {
    const { imageFormData, nickname, password, currentPassword } = settings;

    if (Object.values(settings).every(value => value === "")) {
      this.areAllEmpty = true;
    }
    if (nickname !== "") {
      fetch(`/api/users/${this.user._id}/setting`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: this.user._id,
          nickname,
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.savedNickname = true;
            this.user = { ...this.user, nickname };
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (password !== '') {
      fetch('/api/pwcheck', {
        method: 'POST',
        body: JSON.stringify({
          pass: currentPassword,
          oldpassword: this.user.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetch('/api/pwhash', {
              method: 'POST',
              body: JSON.stringify({
                pass: password
              }),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(res => res.json())
              .then(data => {
                const password = data.hash;
                fetch(`/api/users/${this.user._id}/setting/password`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    _id: this.user._id,
                    password,
                  }),
                  headers: { 'Content-Type': 'application/json' }
                })
                document.getElementById('currentPassword').value = '';
                document.getElementById('setNewPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                this.savedPassword = true;
                this.user = { ...this.user, password };
              })
              .catch(err => {
                console.log(err);
              });
          }
          else {
            this.isNotCorrectPass = true;
            return;
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (imageFormData) {
      fetch('/api/upload', {
        method: 'POST',
        body: imageFormData
      })
        .then(res => res.json())
        .then(res => {
          this.user = { ...this.user, image: res.path };
        });
    }
  }

  @action isCorrectPass() {
    this.isNotCorrectPass = false;
  }

  @action resetAlert() {
    this.isNotCorrectPass = false;
    this.savedNickname = false;
    this.savedPassword = false;
    this.areAllEmpty = false;
  }
}

export const loginStore = new LoginStore();
