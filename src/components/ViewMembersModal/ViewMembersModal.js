import './ViewMembersModal.scss';

@inject('userStore', 'channelStore')
@observer export default class ViewMembersModal extends Component {

  setNewAdmin(e, userId) {
    this.props.channelStore.setAdmin(userId);
    this.forceUpdate();
  }

}