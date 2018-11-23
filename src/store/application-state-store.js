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
          })
          socket.off('chat message');
          socket.on(
            'chat message',
            (messages) => {
              for (let message of messages) {
                let time = new Date(message.time);
                console.log(time)
                if (message.channel === channelStore.currentChannel._id) {
                  let m=  {
                    channel: message.channel,
                    sender: message.sender,
                    star: false,
                    text: message.text,
                    textType: message.textType,
                    time: message.time,
                    unread: true,
                  };
                  // time: time.toLocaleDateString() + ' ' + time.toLocaleTimeString(),
                  channelStore.channelChatHistory.push(m)
                }
                if (message.sender) {
                  channelStore.userDict[message.sender].status = true;
                }
                if (message.channel !== toJS(channelStore.currentChannel)._id) {
                  channelStore.groupChannels.forEach(channel => {
                    if (channel._id === message.channel) {
                      if (!channel.messageNum) {
                        channel.messageNum = 1;
                      } else {
                        channel.messageNum++;
                      }
                    }
                  })
                  channelStore.contactChannels.forEach(channel => {
                    if (channel._id === message.channel) {
                      if (!channel.messageNum) {
                        channel.messageNum = 1;
                      } else {
                        channel.messageNum++;
                      }
                    }
                  })
                }
              }
            })
          socket.on('sign up', message => {
            channelStore.getUserList();
          })
          socket.on('login', message => {
            this.onLineUsers = message.loginUser;
            channelStore.getLoginStatus();
          })
          socket.on('logout', message => {
            this.onLineUsers = message.loginUser;
            channelStore.getUserList().then(
              channelStore.getLoginStatus()
            )
          })
        }
        socket.on('system message', async (data)=>{
          if(data.invitee){
            if(data.invitee.toString() === userStore.user._id.toString()){
              socket.emit('invitation', data);
            }
          }
         


          // Move!!!!!
          // if(data.newChannel){
          //   let c= data.newChannel;
          //   let id= userStore.user._id.toString();
          //   for(let i of c.members) {
          //     if(i.toString()===id ){
          //       if(c.group){
          //         channelStore.groupChannels.push(c);
          //         console.log(channelStore.groupChannels)
          //       }else{
          //         let name = await channelStore.getContactName(c.members);
          //         if (name !== undefined) {
          //         channelStore.channelDict[c._id] = { _id: c._id, channelname: name.name, image: name.img, members: c.members, admin: c.admin, favorite: c.favorite, group: c.group, open: c.open, messageNum: c.messageNum }
          //       channelStore.contactChannels.push(channelStore.channelDict[c._id]);
          //     } 
          //       }
          //       socket.emit('newChannel', data.newChannel);
          //     }
          //   }
          // }

        })
        socket.on('newChannel', (data)=>{
        
        })
        socket.on('message', event => {
          console.log('Message from server ', event);
        })
        userStore.checkState();
      }).catch(err => {
        console.log("err", err)
      });
  }
}

export const applicationStateStore = new ApplicationStateStore();