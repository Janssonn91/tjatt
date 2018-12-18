import "./CreateGroupModal.scss";
import ScrollableFeed from 'react-scrollable-feed';

@inject('userStore', 'channelStore') @withRouter @observer export default class CreateGroupModal extends Component {

  @observable groupName = '';
  @observable myAttr = 'd-none';
  @observable check = 'false';
  @observable searchContact = this.props.userStore.groupCandidates;
  @observable groupnameExist = false;

  async start() {
    await sleep(100);
    // Show all contacts from beginning
    this.searchContact = [];
  }

  searchContacts = (e) => {
    this.searchContact = [];
    if (!e.target.value) {
      // only show first 5 contacts in the array
      console.log(toJS(this.searchContact));
      // return this.searchContact = this.props.userStore.groupCandidates.slice(0, 5);
      return this.searchContact = [];
    }
    let regex = new RegExp(e.target.value, 'i');
    this.searchContact = this.props.userStore.groupCandidates.filter(user => {
      return regex.test(user.nickname || user.username || user.email)
    })
  }

  checkboxHandler = (e) => {
    if (e.target.checked) {
      this.searchContact = this.props.userStore.groupCandidates;
    } else {
      this.searchContact = [];
    }
  }

  removeFromSearchedUsers = (user) => {
    const index = this.searchContact.findIndex(u => u._id.toString() === user._id.toString());
    this.searchContact.splice(index, 1);
  }

  removeFromSelectedUser = (user) => {
    this.searchContact.unshift(user);

  }

  groupNameChange(e) {
    this.groupName = e.currentTarget.value;
  }

  checkBeforeSubmit() {
    //check if groupName is available
  }

  async createGroup(e) {
    const { userStore, channelStore } = this.props;
    //check Before Submit;
    if (!this.groupName) {
      this.myAttr = 'show text-danger w-100 d-block mb-3';
      return;
    } else {
      this.myAttr = 'd-none';
      this.groupnameExist= false;
      fetch(`/api/checkChannelname/${this.groupName}`,
      {
        method: 'POST',
        body:JSON.stringify({channelname: this.groupName}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res=>res.json()).then(async res=>{
        if(res.success){
          
          const admin = userStore.user._id;
          const members = userStore.selectedGroupMember.map(user => user._id);
          members.push(admin);
          channelStore.createChannel(this.groupName, admin, members, true, true);
          await sleep(60);
          Channel.find({ channelname: this.groupName }).then(channel => {
            channelStore.changeChannel(channel[0]);
            channelStore.groupChannels.push(channel[0]);
            channel[0].members.forEach(member => {
              console.log("push channel into member", member)
              fetch(`/api/users/${member}`, {
                method: 'PUT',
                body: JSON.stringify({
                  _id: member,
                  channel: channel[0]._id
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
        })
          .then(res => {
            res.json();
          }).catch(err => {
            console.log(err);
          })
      })
      socket.emit('system', { newChannel: channel[0], creater: userStore.user._id, type:"create group"})
   
    })


    this.props.userStore.cleanUpGroupModal();
    this.groupName = "";
    this.props.toggle();
        }else{
          this.groupnameExist= true;
        }
      }).catch((err)=>{
        console.log("channelname check", err);
      })
    }

    

  }



  scrollToBottom = () => {
    this.selectedMemberEnd.scrollIntoView({ behavior: "smooth" })
  };

}