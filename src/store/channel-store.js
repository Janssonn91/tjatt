import {
    loginStore
} from './login-store';
class ChannelStore {
    @observable newChannel = [];
    @observable contactChannel = [];
    @observable groupChannel = [];
    @observable myChannels = [];
    @observable currentChannel = "";
    @observable channelName = "";
    @observable channelImg = "";
    @observable currentChannelType = "";



    //TODO: as a new user, introduction page shows instead of chat page

    @action async getChannels() {
        let channels = loginStore.user.channel;
        //console.log(channels)

        this.myChannels = await Channel.find({
            _id: channels
        });
        this.myChannels.forEach((channel) => {

            if (channel.admin.length > 1) {
                this.contactChannel.push(channel);
            } else {
                this.groupChannel.push(channel);
            }
        })
        //TODO: currentChannel will be latest chat
    }

    @action createChannel(channelname, admin, members) {
        this.newChannel = {
            channelname: channelname,
            admin: admin,
            members: members,
            favorite: false,
            open: true,
            group: false
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
        console.log("contact", this.contactChannel);
        console.log("all", this.myChannels);
    }

    @action async getChannelByUser(userId) {
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




    @action getChannelInfo() {
        //console.log(this.currentChannel)
        let channel = this.currentChannel;
        //this.currentChannelType = channel.group
        if (!channel) {
            console.log("hej")
        } else {
            if (channel.group === false) {
                let nameId = channel.admin.filter(a => a !== loginStore.user._id);
                let otheruser = loginStore.myContacts.filter(user =>
                    user._id === nameId[0]);
                //console.log(toJS(otheruser))
                this.channelName = otheruser[0].nickname;
                this.channelImg = otheruser[0].image;
            } else {
                this.channelName = channel.channelname;
            }
        }
        console.log(this.channelName)


    }


}


const channelStore = new ChannelStore();
export default channelStore;