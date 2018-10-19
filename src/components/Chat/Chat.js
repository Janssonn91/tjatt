//  import {
//      library
//  } from '@fortawesome/fontawesome-svg-core'
//  import {
//      FontAwesomeIcon
//  } from '@fortawesome/react-fontawesome'
//  import {
     
//      faUsers,
//      faCircle,
//      faFile,
//      faFileImage,
//      faPlus,
//      faCode,
//      faCodeBranch
//  } from '@fortawesome/free-solid-svg-icons'

 import './Chat.scss';

//  library.add( faUsers, faCircle, faFile, faFileImage, faPlus, faCode, faCodeBranch);

 @observer
 export default class Chat extends Component {

     @observable message = '';
     @observable isOpen = false;
     @observable dropdownOpen = false;
     @observable addMemberModal = false;
     @observable removeMemberModal = false;
     @observable propsToModal = {
         modalType: "add",
         groupMembers: [],
         allContacts: [],
         modalClass: "",
         btnText:""
     }

     @observable sendToAddModal ={
         isOpen: false,
         toggle: this.addMemberModalToggle.bind(this)
     }

     @observable sendToDeleteModal ={
        isOpen: false,
        toggle: this.deleteMemberModalToggle.bind(this)
    }
 

     start() {
         this.createStoreConnectedProperties({
             chatHistories: []
         });
     }

     addMemberModalToggle(){
        this.sendToAddModal.isOpen = !this.sendToAddModal.isOpen
     }

     deleteMemberModalToggle(){
        this.sendToDeleteModal.isOpen = !this.sendToDeleteModal.isOpen
     }

     toggle(){
        this.isOpen = !this.isOpen;
      }

    dropdownToggle(){
      this.dropdownOpen = !this.dropdownOpen;
    }

     sendMessage() {
         console.log(this.message)
     
     }

 }
 