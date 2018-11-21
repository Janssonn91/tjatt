import './ChatMessage.scss';

@inject('userStore', 'channelStore') @observer
export default class ChatMessage extends Component {

  @observable iconShow = false;
  @observable iconDisappear = false;
  @observable isOpen = false;
  @observable dropdownOpen = false;
  @observable deleteMessageModal = false;

  @observable sendToDeleteMessageModal = {
    isOpen: false,
    toggle: this.deleteMessageModalToggle.bind(this)
  }

  async start() { }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  deleteMessageModalToggle() {
    this.sendToDeleteMessageModal.isOpen = !this.sendToDeleteMessageModal.isOpen
  }

  formattedTime(t){
    t = new Date(t);
    let result = "";
    let today = new Date();
    let hour = t.getHours();
    let min = t.getMinutes();
    let ampm = hour >= 12 ? "AM" : "PM";
    hour = hour % 12;
    hour = hour ? hour: 12;
    if(today.setHours(0,0,0,0)===t.setHours(0,0,0,0)){
      result += hour + ":" + min + " " + ampm + " Today";
      return result; 
    }else{
      result += t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() 
      + " " + hour + ":" + min + " " + ampm;
      return result;
    }

 
  }

}