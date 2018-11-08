import channelStore from './channel-store';

class LoginStore {
  @observable user = { channel: [], contact: [] };
  @observable isLoggedIn = false;
  @observable loginError = false;
  @observable usernameExits = false;
  @observable candidates = [];
  @observable myContacts = [];
  //@observable myChannel = [];
  @observable groupCandidates = [];
  @observable selectedGroupMember = [];
  @observable message = '';
  @observable receivedMessages = [];
  @observable isNotCorrectPass = false;
  @observable savedNickname = false;
  @observable savedPassword = false;
  // @observable myGroups = [];

  constructor() {
    this.checkIfLoggedIn();
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
          channelStore.getChannels().then(()=>{
            channelStore.myChannels.map((channel)=>{
               socket.emit('join channel', channel._id)
            }
              )
          }
            
          )
         
          socket.off('chat message');
          socket.on(
            'chat message',
            (messages) => {
              for(let message of messages){
  
                let date = new Date();
                if(message.channel===channelStore.currentChannel._id){
                 channelStore.channelChatHistory.push(
                   {channel: message.channel,
                    sender: message.sender,
                    star: false,
                    text: message.text,
                    textType: message.textType,
                    time: date
                   }
                 )
                  channelStore.renderChatMessage();
                }
              }
         
            })
          console.log(this.receivedMessages)
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  @action login(username, password) {
    fetch('/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.user = res.user;
          this.isLoggedIn = true;
          //this.myChannel = this.user.channel;
        }
        else {
          this.loginError = true;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  @action signUp(username, password, useremail) {
    console.log(username, password, useremail);
    fetch('/api/users',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, password, useremail }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('created user: ' + username + ' med mail ' + useremail)
          this.user = res.user
          this.usernameExits = false;
          this.isLoggedIn = true;
          this.sendWelcomeMail(username, useremail);
        } else {
          console.log('träff');
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  }

  sendWelcomeMail(username, email) {
    fetch('/api/send-mail', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('mail skickat')
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  @action fetchContact() {
    return new Promise((resolve, reject) => {
      fetch('/api/users')
        .then(res => res.json())
        .then(users => {
          const withoutMe = users.filter(user => user._id !== this.user._id);

          const isIncluded = (userId) => {
            return this.user.contact.some(contactId => userId === contactId);
          }
          this.candidates = withoutMe.filter(user => !isIncluded(user._id));
          this.myContacts = withoutMe.filter(user => isIncluded(user._id));
          this.groupCandidates = withoutMe.filter(user => isIncluded(user._id));
          resolve();
        })
    })

  }


  // remove added user in candidates
  @action updateContact(userId) {
    const addedUser = this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);
    this.myContacts.push(addedUser);
    this.groupCandidates.push(addedUser);
    channelStore.renderChannelElements(channelStore.contactChannels, 'contact', 'contactsRender');
  }

  @action cleanUpGroupModal(){
    this.selectedGroupMember.map((data)=>{
      return this.groupCandidates.push(data);
      });
    this.selectedGroupMember = [];
  }

  @action addContact(userId) {
    const channelname = this.user._id + " and " + userId;
    const admin = [this.user._id, userId];
    const members = [this.user._id, userId];

    channelStore.createChannel(channelname, admin, members, false).then(channel => {
      // add contact in my contact
      fetch(`/api/users/${this.user._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: this.user._id, contact: userId, channel: channel._id
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(() => {
          this.updateContact(userId);
        })
        .catch(err => {
          console.log(err);
        });

      // add my id to the new friend contact
      fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ userId, contact: this.user._id, channel: channel._id }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .catch(err => {
          console.log(err);
        });
    });
  }

  @action selectOneForGroup(user) {
    this.selectedGroupMember.push(user);
    console.log(this.selectedGroupMember)
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

  @action updateSettings(settings) {
    const { imageFormData, nickname, password, currentPassword } = settings;
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
  }
}

export const loginStore = new LoginStore();
