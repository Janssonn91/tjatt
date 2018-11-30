import './SnippetModal.scss';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable textFile = false;

  start() { }

  switchTextFile = () => {

    this.textFile = !this.textFile;
    console.log(this.textFile);
  }
}