 import "./CreateGroupModal.scss";

 @inject('loginStore', 'channelStore') @withRouter @observer export default class CreateGroupModal extends Component {

  @observable groupName = ''; 
  @observable myAttr = 'd-none';
  @observable showAttr = 'd-none';
  @observable check = 'false';


  @action groupNameChange(e) {
    this.groupName = e.currentTarget.value;
  }

  @action checkBeforeSubmit(){
    //check if groupName is available


  }

  @action createGroup(){
    //check Before Submit;

    if(!this.groupName){
      this.myAttr='show';
      return;
    }else{
      this.myAttr= 'd-none';
    }
    //check if groupMember.length is large than 2

    if(this.props.loginStore.selectedGroupMember.length<2){
      this.showAttr = 'show';
      return;
    }else{
      this.showAttr = 'd-none';
    }
    
    this.props.channelStore.addChannel(this.groupName);
    
   
  }

 

}