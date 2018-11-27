@inject('userStore', 'channelStore') @observer export default class DeleteContactModal extends Component {
  start(){
    console.log(this.props.members);
    console.log(this.props._id);
  }

  // removeContact(){
  //   console.log(this.props.members);
  //   console.log(this.props.channelId);
  // }
  

  removeContact(){
    // getting channel.members, channel._id from jsx
    // console.log(toJS(members));
    // console.log('kanalen är: ', channelId)
    // console.log('jag är: ', this.props.userStore.user._id);
    const userId = this.props.userStore.user._id;
    const contId = this.props.members.filter(id => id!== this.props.userStore.user._id);
    // console.log('vill ta bort: ', contId);
    // console.log(toJS(this.props.channelStore.contactChannels));
    this.props.userStore.moveContactToCandidates(contId);
    this.props.channelStore.spliceChannel(this.props.channelId);
    // this.props.history.push(`/${this.props.userStore.user.username}`);
 
    fetch(`/api/removeContact/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        contId: contId,
        channelId: this.props.channelId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  };


 }