import './SnippetModal.scss';
import { vs2015 } from 'react-syntax-highlighter/dist/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
@inject('userStore', 'channelStore') @observer
export default class SnippetModal extends Component {

  @observable uploadOrText = false;
  @observable codeMessage = '';

  start() {


  }


  tabTextArea = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      // get caret position/selection
      let val = this.codeMessage,
        start = e.selectionStart,
        end = e.selectionEnd;
      // set textarea value to: text before caret + tab + text after caret
      this.codeMessage = '\t' + val.substring(0, start) + val.substring(end);
      console.log(this.codeMessage)

      // put caret at right position again
      e.selectionStart = (e.selectionEnd + start) + 1;

      // prevent the focus lose
      return false;
    }
  }

  switchTextFile = () => {
    this.uploadOrText = !this.uploadOrText;
    console.log(this.uploadOrText);
  }
}