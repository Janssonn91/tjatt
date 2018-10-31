import {loginStore} from './login-store';
class ChannelStore {
   @observable channels = [];

   @action getChannels(){
       this.channels= toJS(loginStore.user.channel);
       this.channelId = "";
        //console.log(this.channels);
   }

   @action createChannel(channelname, admin, members){
       const newChannel= {
           channelname: channelname,
           admin: admin,
           members: members
       }

       return Channel.create(newChannel).then(()=>{
            return Channel.findOne({channelname: newChannel.channelname});
       })
       //this.channels.push(newChannel);
       

       

       //this.channels.push(newChannel);
       


    
   }

   @action test(){
       console.log("test")
   }

   
}

const channelStore = new ChannelStore();
export default channelStore;