import './SnippetModal.scss';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable textFile = false;

  start() {
    console.log('modal pleaaaase')
  }

  switchTextFile = () => {

    this.textFile = !this.textFile;
    console.log(this.textFile);
  }
}