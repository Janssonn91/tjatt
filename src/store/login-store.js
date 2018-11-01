import channelStore from './channel-store';

class LoginStore {
  @observable user = {};
  @observable loginError = false;
  @observable usernameExits = false;
  @observable candidates = [];
  @observable myContacts = [];
  @observable myChannel = [];


  @action checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          this.user = res.user;
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
        }
        this.loginError = true;
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
          this.sendWelcomeMail(username, useremail);
        } else {
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  }

  sendWelcomeMail(username, email){
    fetch('/api/send-mail', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify( {username, email} ),
      headers: { 'Content-Type': 'application/json'}
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
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        const withoutMe = users.filter(user => user._id !== this.user._id);

        const isIncluded = (userId) => {
          return this.user.contact.some(contactId => userId === contactId);
        }
        this.candidates = withoutMe.filter(user => !isIncluded(user._id));
        this.myContacts = withoutMe.filter(user => isIncluded(user._id));
      });
  }

  // remove added user in candidates
  @action updateContact(userId) {
    const addedUser = this.candidates.find(user => user._id === userId);
    const index = this.candidates.indexOf(addedUser);
    this.candidates.splice(index, 1);
    this.myContacts.push(addedUser);
  }

  @action addContact(userId) {
      const channelname= this.user._id + " and " + userId;
      const admin = [this.user._id, userId];
      const members = [this.user._id, userId];
      
      channelStore.createChannel(channelname, admin, members).then((channel)=>{
   // add contact in my contact
   fetch(`/api/users/${this.user._id}`, {
    method: 'PUT',
    body: JSON.stringify({ _id: this.user._id, contact: userId, channel: channel._id
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      res.json();
    })
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
    .then(res => {
      res.json();
    })
    .catch(err => {
      console.log(err);
    });
      });
     
      
 

  }

  
}

export const loginStore = new LoginStore();
