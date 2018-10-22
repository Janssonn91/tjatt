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

import './../Chat/Chat.scss';

library.add(faUser, faUsers, faCircle, faFile, faFileImage, faPlus, faCode, faCodeBranch);


export default class ChatHeader extends Component {
  
  @observable isOpen = false;
  @observable dropdownOpen = false;
  
  
  async start() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  dropdownToggle() {
    this.dropdownOpen = !this.dropdownOpen;
}

}