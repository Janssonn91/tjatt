import './SnippetModal.scss';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable textFile = false;
  @observable codefileValue = '';

  start() {
    console.log('hej')
    console.log('chat history', toJS(this.props.channelStore.channelChatHistory));

  }

  getFileValue = () => {
    console.log(document.querySelector('#codefile').files[0].name);
    let fileValue = document.querySelector('#codefile').files[0].name;
    this.codefileValue = fileValue;
  }

  switchTextFile = () => {
    this.textFile = !this.textFile;
    console.log(this.textFile);
  }
}