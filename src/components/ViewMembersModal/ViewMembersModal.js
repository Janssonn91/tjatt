import './ViewMembersModal.scss';

@inject('loginStore', 'channelStore') @observer export default class ViewMembersModal extends Component {
  
  async start() {
    this.props.loginStore.fetchContact();
  }
  
}