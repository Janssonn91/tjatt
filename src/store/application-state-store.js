import channelStore from './channel-store';
import { userStore } from './user-store';

class ApplicationStateStore {
  @observable onLineUsers = [];
  @observable systemMessage = {};
  @observable confirmInvite = "";


  @action checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          userStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });
          userStore.fetchContact();
          socket.emit('login', userStore.user._id);
          socket.emit('online', userStore.user._id);

          socket.on('online', message => {
            console.log('online', message)
            this.onLineUsers = message.loginUser;
            channelStore.getLoginStatus();
          });
          socket.on('sign up', message => {
            channelStore.getUserList();
          });
          socket.on('login', message => {
            this.onLineUsers = message.loginUser;
            channelStore.getLoginStatus();
          });
          socket.on('logout', message => {
            this.onLineUsers = message.loginUser;
            channelStore.getUserList().then(
              channelStore.getLoginStatus()
            )
          });
        }
        userStore.checkState();
      }).catch(err => {
        console.log("err", err)
      });
  }
}

export const applicationStateStore = new ApplicationStateStore();