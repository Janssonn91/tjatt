import "./CreateGroupModal.scss";
import ScrollableFeed from 'react-scrollable-feed';

@inject('loginStore', 'channelStore') @withRouter @observer export default class CreateGroupModal extends Component {

  @observable groupName = '';
  @observable myAttr = 'd-none';
  @observable showAttr = 'd-none';
  @observable check = 'false';
  @observable searchContact = [];

  start() {
    this.props.loginStore.fetchContact()
      // Show all contacts from beginning
      .then(() => {
        this.searchContact = this.props.loginStore.groupCandidates.slice(0, 5);
      })
  }

  searchContacts = (e) => {
    this.searchContact = [];
    if (!e.target.value) {
      // only show first 5 contacts in the array
      return this.searchContact = this.props.loginStore.groupCandidates.slice(0, 5);
    }
    let regex = new RegExp(e.target.value, 'i');
    let result = this.props.loginStore.groupCandidates.filter(user => {
      if (regex.test(user.nickname || user.username || user.email)) {
        return this.searchContact.push(user);
      }
      return null;
    })
  }

  removeFromSearchedUsers = (user) => {
    const addedUser = this.searchContact.find(u => u._id === user._id);
    const index = this.searchContact.indexOf(addedUser);
    this.searchContact.splice(index, 1);
  }

  removeFromSelectedUser = (user) => {
    this.searchContact.push(user);
    // const addedUser = this.selectedGroupMember.find(u => u._id === user._id);
    // const index = this.selectedGroupMember.indexOf(addedUser);
  }


  groupNameChange(e) {
    this.groupName = e.currentTarget.value;
  }

  checkBeforeSubmit() {
    //check if groupName is available


  }

  async createGroup(e) {
    //check Before Submit;
    if (!this.groupName) {
      this.myAttr = 'show text-danger w-100 d-block mb-3';
      return;
    } else {
      this.myAttr = 'd-none';
    }
    //check if groupMember.length is large than 2
    if (this.props.loginStore.selectedGroupMember.length < 2) {
      this.showAttr = 'show';
      return;
    } else {
      this.showAttr = 'd-none';
    }
    await this.props.channelStore.createGroup(this.groupName);
    this.props.loginStore.cleanUpGroupModal();
    this.groupName = "";
    this.props.toggle();

  }



  scrollToBottom = () => {
    this.selectedMemberEnd.scrollIntoView({ behavior: "smooth" })
  };



}