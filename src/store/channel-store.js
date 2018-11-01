import {
    loginStore
} from './login-store';
import { renderReporter } from 'mobx-react';
class ChannelStore {
    @observable newChannel = [];
    
    @observable myChannels = [];
    @observable currentChannel = "";
    @observable channelName = "";
    @observable channelImg = "";
    @observable currentChannelGroup = false;
    @observable amIAdmin = "";
    @observable contactChannel = [];
    @observable groupChannel = [];



    //TODO: as a new user, introduction page shows instead of chat page

    @action async getChannels() {
        let channels = loginStore.user.channel;
        //console.log(channels)
    
        this.myChannels = await Channel.find({
            _id: channels
        });
        this.myChannels.forEach((channel) => {
            
            if (channel.group===false) {
                this.contactChannel.push(channel);
            } else {
                this.groupChannel.push(channel);
            }
        })
       
        //TODO: currentChannel will be latest chat
    }

  

    @action createChannel(channelname, admin, members, group) {
        this.newChannel = {
            channelname: channelname,
            admin: admin,
            members: members,
            favorite: false,
            open: true,
            group: group
        }
        return Channel.create(this.newChannel).then(() => {
            return Channel.findOne({
                channelname: this.newChannel.channelname
            });
        })
    }


    @action updateContactChannel() {
       this.contactChannel.push(this.newChannel);
        this.myChannels.push(this.newChannel);
    }

    @action updateGroupChannel(){
        this.groupChannel.push(this.newChannel);
        this.myChannels.push(this.newChannel);
    }

    @action async getChannelByUser(userId) {
        console.log(this.contactChannel)
        console.log(userId)
        this.currentChannel = "";
        this.channelName = "";
        this.channelImg = "";
        this.currentChannelType = "";
        this.contactChannel.map(channel => {
            channel.admin.map(data => {
                if (data === userId) {
                    return this.currentChannel = channel;
                }
            })
        })
        //console.log(this.currentChannel)
        this.getChannelInfo();
    }

    // @action async getChannelById(){
    //      Channel.find().then(channels=> {
             
    //        this.groupChannel.forEach(c=>{
    //            console.log(c)
    //             let a=channels.filter(channel=>channel._id === c)
    //             loginStore.myGroups.push(a);
    //             console.log(a)
    //       })
    //       console.log("myGroup",loginStore.myGroups)
    //       //this.renderGroup();
    //     })
    // }

    @action async getGroupChannelName(id){
        console.log(id)
       let channels = await Channel.find({
            group: true
        })
        channels.filter(channel=>channel._id===id)
        //To do!!!!!!
      
        
    }




    @action getChannelInfo() {
       
        console.log(this.currentChannel)
        let channel = this.currentChannel;
        this.amIAdmin = channel.admin.some(a=> a===loginStore.user._id);
        if (!channel) {
            console.log("hej")
        } else {
            if (channel.group === false) {
                this.currentChannelGroup = false;
                let nameId = channel.admin.filter(a => a !== loginStore.user._id);
                let otheruser = loginStore.myContacts.filter(user =>
                    user._id === nameId[0]);
                //console.log(toJS(otheruser))
                this.channelName = otheruser[0].nickname;
                this.channelImg = otheruser[0].image;
                this.amIAdmin = true;
            } else {
                this.currentChannelGroup = true;
                this.channelName = channel.channelname;
              
                //TODO: whether login user is admin or not
            }
        }
        console.log(this.channelName)


    }


}


const channelStore = new ChannelStore();
export default channelStore;