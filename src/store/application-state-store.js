import channelStore from './channel-store';
import {userStore} from './user-store';
class ApplicationStateStore {
  @observable onLineUsers = [];

  constructor() {
    socket.on('online', message => {
      console.log('online', message)
      userStore.onLineUsers= message.onlineUsers;
      channelStore.getLoginStatus();
    })
  }

  @action fetchUser() {
    socket.emit('online', userStore.user._id);
  }
}

export const applicationStateStore = new ApplicationStateStore();