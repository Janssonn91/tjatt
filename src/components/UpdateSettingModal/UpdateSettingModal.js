import './UpdateSettingModal.scss';
import imgPath from '../Sidebar/Sidebar';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = '';
  @observable nickname = '';
  @observable newPassword = '';
  //@observable isNotSamePass = false;

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
    if (this.props.loginStore.setNewPasswordValue.length === this.props.loginStore.confirmNewPasswordValue.length) {
      this.checkNewPassword();
    }
  }

  passwordFocus() {
    this.props.loginStore.isNotCorrectPass = false;
  }

  checkNewPassword = () => {
    if (this.props.loginStore.setNewPasswordValue === this.props.loginStore.confirmNewPasswordValue) {
      this.props.loginStore.isNotSamePass = false;
      this.newPassword = this.props.loginStore.confirmNewPasswordValue;
    } else {
      this.props.loginStore.isNotSamePass = true;
      this.newPassword = '';
    }
  }

  callUpdateSettings() {
    this.props.loginStore.updateSettings({
      nickname: this.nickname,
      password: this.newPassword,
      imageFormData: this.image,
      currentPassword: this.props.loginStore.currentPasswordValue
    });
  }
}