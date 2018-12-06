import './ViewMembersModal.scss';

@inject('userStore', 'channelStore')
@observer export default class ViewMembersModal extends Component {
  
  setNewAdmin(e, userId){
    // set new admin on frontend
    this.props.channelStore.setAdmin(userId, this.props.channelStore.currentChannel);
    
    // set new admin on backend
    fetch(`/api/updateAdmin/${this.props.channelStore.currentChannel._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        adminId: userId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(res => {
        console.log('admin updated: ', res)
      })
      .catch(err => {
        console.log(err);
      })
  }

}