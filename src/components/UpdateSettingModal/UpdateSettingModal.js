import './UpdateSettingModal.scss';
import imgPath from '../Sidebar/Sidebar';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = '';
  @observable nickname = '';
  //@observable currentPasswordValue = '';
  //@observable setNewPasswordValue = '';
  //@observable confirmNewPasswordValue = '';
  @observable newPassword = '';
  @observable isNotSamePass = false;


  onFileChange = (e) => {
    const formData = new FormData();
    formData.append('id', this.props.loginStore.user._id);
    formData.append('file', e.target.files[0]);
    this.image = formData;
  }

  currentPassword(e) {
    this.props.loginStore.currentPasswordValue = e.currentTarget.value;
  }

  setNewPassword(e) {
    this.props.loginStore.setNewPasswordValue = e.currentTarget.value;
  }

  confirmNewPassword(e) {
    this.props.loginStore.confirmNewPasswordValue = e.currentTarget.value;
    this.checkNewPassword();
  }

  passwordFocus() {
    this.props.loginStore.isNotCorrectPass = false;
  }

  checkNewPassword = () => {
    if (this.props.loginStore.setNewPasswordValue === this.props.loginStore.confirmNewPasswordValue) {
      this.isNotSamePass = false;
      this.newPassword = this.props.loginStore.confirmNewPasswordValue;
    } else {
      this.isNotSamePass = true;
      this.newPassword = '';
    }
  }
}