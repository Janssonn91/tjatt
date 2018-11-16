import './DeleteMessageModal.scss'

export default class DeleteMessageModal extends Component {

  deleteMessage() {
    fetch(`/api/message/${this.props.messageId}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log('result', result);
      })
      .catch(err => {
        console.log(err);
      });
  }

}