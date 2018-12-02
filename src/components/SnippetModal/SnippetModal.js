import './SnippetModal.scss';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable textFile = false;

  start() {
    console.log('hej')
    console.log('chat history', toJS(this.props.channelStore.channelChatHistory));

  }



  switchTextFile = () => {
    this.textFile = !this.textFile;
    console.log(this.textFile);
  }
}