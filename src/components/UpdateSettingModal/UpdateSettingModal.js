import './UpdateSettingModal.scss';
const defaultImg = "/images/placeholder.png";

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable imgPath = this.props.loginStore.user.image || defaultImg;
  @observable image = '';
  @observable nickname = '';
  @observable newPassword = '';
  @observable currentPasswordValue = '';
  @observable setNewPasswordValue = '';
  @observable confirmNewPasswordValue = '';
  @observable isNotSamePass = false;

  onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgPath = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('id', this.props.loginStore.user._id);
      formData.append('file', e.target.files[0]);
      this.image = formData;
      this.props.loginStore.areAllEmpty = false; // Close "areAllEmpty" alert
    }
  }

  handleNicknameChange = (e) => {
    this.nickname = e.currentTarget.value;
    this.props.loginStore.areAllEmpty = false; // Close "areAllEmpty" alert
  }

  currentPassword(e) {
    this.currentPasswordValue = e.currentTarget.value;
    this.props.loginStore.areAllEmpty = false; // Close "areAllEmpty" alert
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
    if (!this.props.loginStore.isNotCorrectPass && !this.isNotSamePass && !this.props.loginStore.areAllEmpty) {
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