 import "./CreateGroupModal.scss";

 @inject('loginStore', 'channelStore') @withRouter @observer export default class CreateGroupModal extends Component {

  @observable groupName = ''; 
  @observable myAttr = 'd-none';
  @observable showAttr = 'd-none';


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

  }

  @action createGroup(){
    this.checkBeforeSubmit();
    const admin = this.props.loginStore.user._id;
    const members = this.props.loginStore.selectedGroupMember.map(user => user._id);
    members.push(admin);
    console.log("admin", admin);
    console.log("members", members);
    this.props.channelStore.createChannel(this.groupName, admin, members, true);
    this.props.channelStore.updateGroupChannel();
  }

 

}