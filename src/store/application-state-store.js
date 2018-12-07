import channelStore from './channel-store';
import { userStore } from './user-store';

class ApplicationStateStore {
  @observable onLineUsers = [];
  @observable systemMessage = {};
  @observable confirmInvite = "";
  @observable systemId = "";
  @observable systemChannel = "";


  @action checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        this.systemChannel = "";
        if (res.loggedIn) {
          userStore.setUserAndIsLoggedIn({ user: res.user, isLoggedIn: true });


          fetch('/api/system').then(res => res.json()).then(data => {
            this.systemChannel = data.systemChannel;
            console.log("systemChannel", data.systemChannel)

            this.systemId = data.systemUserId;
            console.log("systemId", this.systemId);
            //channelStore.getUserList();
          }).catch(err => console.log(err))

          socket.emit('login', userStore.user._id);
          socket.emit('online', userStore.user._id);

          socket.on('online', message => {
            let ids = message.onlineUsers;
            channelStore.getLoginStatus(ids);
          });
          socket.on('sign up', message => {
           // channelStore.getUserList();
            userStore.fetchContact();
          });
          socket.on('login', message => {
            channelStore.getLoginStatus( message.loginUser);
          });
          socket.on('logout', message => {
            channelStore.getLoginStatus(message.loginUser);
            // channelStore.getUserList().then(
            //   channelStore.getLoginStatus(message.loginUser)
            // )
          });
          socket.on('delete message', message => {
            console.log(message)
            channelStore.channelChatHistory = channelStore.channelChatHistory.filter(msg => msg._id !== message)
          })
          userStore.checkState();
        }
        else { console.log("login false") }

      }).catch(err => {
        console.log("err", err)
      });
  }
}

export const applicationStateStore = new ApplicationStateStore();