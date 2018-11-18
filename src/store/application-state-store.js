class ApplicationStateStore {
  @observable onLineUsers = [];

  constructor() {
    socket.on('online', message => {
      console.log('online', message)
      this.onLineUsers = message.onLineUsers;
    })
  }

  @action fetchUser() {
    socket.emit('online');
  }
}

export const applicationStateStore = new ApplicationStateStore();