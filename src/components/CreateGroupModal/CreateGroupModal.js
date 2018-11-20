import "./CreateGroupModal.scss";
import ScrollableFeed from 'react-scrollable-feed';

@inject('userStore', 'channelStore') @withRouter @observer export default class CreateGroupModal extends Component {

  @observable groupName = '';
  @observable myAttr = 'd-none';
  @observable error = false;
  @observable check = 'false';
  @observable searchContact = this.props.userStore.groupCandidates;

  async start() {
    await sleep(10);
    // Show all contacts from beginning
    this.searchContact = [];
  }

  searchContacts = (e) => {
    this.searchContact = [];
    if (!e.target.value) {
      // only show first 5 contacts in the array
      console.log(toJS(this.searchContact));
      // return this.searchContact = this.props.userStore.groupCandidates.slice(0, 5);
      return this.searchContact = [];
    }
    let regex = new RegExp(e.target.value, 'i');
    this.searchContact = this.props.userStore.groupCandidates.filter(user => {
      return regex.test(user.nickname || user.username || user.email)
    })
  }

  checkboxHandler = (e) => {
    if (e.target.checked) {
      this.searchContact = this.props.userStore.groupCandidates;
    } else {
      this.searchContact = [];
    }
  }

  removeFromSearchedUsers = (user) => {
    const addedUser = this.searchContact.find(u => u._id === user._id);
    const index = this.searchContact.indexOf(addedUser);
    this.searchContact.splice(index, 1);
  }

  removeFromSelectedUser = (user) => {
    this.searchContact.push(user);
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
    if (this.props.userStore.selectedGroupMember.length < 2) {
      this.error = true;
      return;
    }
    await this.props.channelStore.createGroup(this.groupName);
    this.props.userStore.cleanUpGroupModal();
    this.groupName = "";
    this.error = false;
    this.props.toggle();
  }

  scrollToBottom = () => {
    this.selectedMemberEnd.scrollIntoView({ behavior: "smooth" })
  };

}