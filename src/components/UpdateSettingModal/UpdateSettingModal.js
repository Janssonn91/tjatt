import './UpdateSettingModal.scss';
import imgPath from '../Sidebar/Sidebar';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = '';
  @observable nickname = this.props.loginStore.user.nickname;
  @observable currentPasswordValue = '';
  @observable setNewPasswordValue = '';
  @observable confirmNewPasswordValue = '';
  @observable newPassword = '';
  @observable isNotSamePass = false;
  @observable isNotCorrectPass = false;


  onFileChange = (e) => {
    const formData = new FormData();
    formData.append('id', this.props.loginStore.user._id);
    formData.append('file', e.target.files[0]);
    this.image = formData;
  }

  currentPassword(e) {
    this.currentPasswordValue = e.currentTarget.value;
  }

  setNewPassword(e) {
    this.setNewPasswordValue = e.currentTarget.value;
  }

  confirmNewPassword(e) {
    this.confirmNewPasswordValue = e.currentTarget.value;
    this.checkNewPassword();
  }

  checkNewPassword = () => {
    if (this.setNewPasswordValue === this.confirmNewPasswordValue) {
      this.isNotSamePass = false;
      this.newPassword = this.confirmNewPasswordValue;
    } else {
      this.isNotSamePass = true;
      this.newPassword = '';
    }
  }
}