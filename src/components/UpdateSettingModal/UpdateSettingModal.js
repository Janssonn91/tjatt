import './UpdateSettingModal.scss';
import imgPath from '../Sidebar/Sidebar';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = '';
  @observable nickname = '';
  @observable newPassword = '';
  @observable currentPasswordValue = '';
  @observable setNewPasswordValue = '';
  @observable confirmNewPasswordValue = '';
  @observable isNotSamePass = false;

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

  passwordFocus() {
    this.props.loginStore.isCorrectPass();
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

  resetInput() {
    this.nickname = '';
    this.newPassword = '';
    this.currentPasswordValue = '';
  }

  async closeModal() {
    await sleep(1500);
    if (!this.props.loginStore.isNotCorrectPass && !this.inNotSamePass) {
      this.props.toggle();
    }
    this.isNotSamePass = false;
  }

  callUpdateSettings() {
    this.props.loginStore.updateSettings({
      nickname: this.nickname,
      password: this.newPassword,
      imageFormData: this.image,
      currentPassword: this.currentPasswordValue
    });
    this.resetInput();
    this.closeModal();
  }
}