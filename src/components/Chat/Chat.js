 import {
     library
 } from '@fortawesome/fontawesome-svg-core'
 import {
     FontAwesomeIcon
 } from '@fortawesome/react-fontawesome'
 import {
     faUser,
     faUsers,
     faCircle,
     faFile,
     faFileImage,
     faPlus,
     faCode,
     faCodeBranch
 } from '@fortawesome/free-solid-svg-icons'

 import './Chat.scss';

 library.add(faUser, faUsers, faCircle, faFile, faFileImage, faPlus, faCode, faCodeBranch);

 @observer
 export default class Chat extends Component {

     @observable inputMessage = '';
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

     @observable sendToModal ={
         isOpen: false,
         toggle: this.toggle.bind(this)
     }
 
    //  addMemberModal:false,
    //  removeMemberModal:false,

     start() {
    

         this.createStoreConnectedProperties({
             chatHistories: []
         });
     }

     toggle(){
        this.sendToModal.isOpen = !this.sendToModal.isOpen
     }

    //  toggle(){
    //     this.isOpen = !this.isOpen;
    //   }

    dropdownToggle(){
        this.dropdownOpen = !this.dropdownOpen;
    }

     messageChange(e) {
         this.inputMessage = e.currentTarget.value;
     }

     toggleModal(){
         console.log(this.addMemberModal)
         console.log(this)

        this.addMemberModal = !this.addMemberModal;
        // switch(modalType) {
        //     case "add":
        //         this.addMemberModal = !this.addMemberModal;
        //         break;
        //     case "remove":
        //         this.removeMemberModal = !this.removeMemberModal;
        //         break;
        //     default:
        //         console.log(type);
        // }
        console.log(this.addMemberModal)

    }

     sendMessage() {

         this.chatHistories.push({
             time: Date.now(),
             userId: "me",
             content: this.inputMessage,
             star: false
         });
         console.log(this.chatHistories);
         //backend
     }

 }
 