import './SnippetModal.scss';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable uploadOrText = false;

  start() {
    console.log('hej')
    console.log('chat history', toJS(this.props.channelStore.channelChatHistory));

  }



  switchTextFile = () => {
    this.uploadOrText = !this.uploadOrText;
    console.log(this.uploadOrText);
  }
}