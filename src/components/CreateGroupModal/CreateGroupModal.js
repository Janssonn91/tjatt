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
    if(!this.groupName){
      this.myAttr='show';
    }else{
      this.myAttr= 'd-none';
    }
    //check if groupMember.length is large than 2

    if(this.props.loginStore.selectedGroupMember.length<2){
      this.showAttr = 'show';
    }else{
      this.showAttr = 'd-none';
    }
    if(this.groupName && this.props.loginStore.selectedGroupMember.length>=2){
      this.check= true;
    }

  }

  @action createGroup(){
    this.checkBeforeSubmit();
    if(this.check){
      this.props.channelStore.addChannel(this.groupName);
    }
   
  }

 

}