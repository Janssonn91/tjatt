@inject('userStore', 'channelStore') @observer export default class DeleteContactModal extends Component {

  removeContact(){
    const userId = this.props.userStore.user._id;
    const contId = this.props.members.filter(id => id!== this.props.userStore.user._id);
    this.props.userStore.moveContactToCandidates(contId);
    this.props.channelStore.spliceChannel(this.props.channelId); 
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
      window.history.pushState(null, null, '/' + this.props.userStore.user.username);
      this.props.toggle();
  };


 }