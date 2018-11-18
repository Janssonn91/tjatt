import './ViewMembersModal.scss';

@inject('loginStore', 'channelStore') 
@observer export default class ViewMembersModal extends Component {
  
  setNewAdmin(e, userId){
    // set new admin on frontend
    this.props.channelStore.setAdmin(userId);
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

// moved from setAdmin in channelstore, saved for reference only
    // this.currentChannel.admin = [...this.currentChannel.admin, newAdminId];
    // console.log(this.currentChannel);
    // console.log(this.currentChannel._id);
    // fetch(`/api/updateAdmin/${this.currentChannel._id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     adminId: newAdminId
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     return res.json();
    //   }).then(res => {
    //     console.log('admin updated: ', res)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })