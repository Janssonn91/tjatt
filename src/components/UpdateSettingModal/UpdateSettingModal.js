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

  // For alert
  @observable isNotSamePass = false;
  @observable isNotCorrectPass = false;
  @observable savedNickname = false;
  @observable savedPassword = false;
  @observable areAllEmpty = false;

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
      this.areAllEmpty = false; // Close "areAllEmpty" alert
    }
  }

  handleNicknameChange = (e) => {
    this.nickname = e.currentTarget.value;
    this.areAllEmpty = false; // Close "areAllEmpty" alert
  }

  currentPassword(e) {
    this.currentPasswordValue = e.currentTarget.value;
    this.areAllEmpty = false; // Close "areAllEmpty" alert
  }

  setNewPassword(e) {
    this.setNewPasswordValue = e.currentTarget.value;
  }

  confirmNewPassword(e) {
    this.confirmNewPasswordValue = e.currentTarget.value;
    this.checkNewPassword();
  }

  isCorrectPass() {
    this.isNotCorrectPass = false;
  }

  passwordFocus() {
    this.isCorrectPass();
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

  resetAlert() {
    this.isNotCorrectPass = false;
    this.savedNickname = false;
    this.savedPassword = false;
    this.areAllEmpty = false;
  }

  resetInput() {
    this.nickname = '';
    this.newPassword = '';
    this.currentPasswordValue = '';
    this.setNewPasswordValue = '';
    this.confirmNewPasswordValue = '';
  }

  async closeModal() {
    await sleep(1500);
    if (!this.isNotCorrectPass && !this.isNotSamePass && !this.areAllEmpty) {
      this.props.toggle();
      this.resetAlert();
    }
  }

  async updateSettings(settings) {
    const { imageFormData, nickname, password, currentPassword } = settings;
    const { user } = this.props.loginStore;

    if (Object.values(settings).every(value => value === "")) {
      this.areAllEmpty = true;
    }
    if (nickname !== "") {
      fetch(`/api/users/${user._id}/setting`, {
        method: 'PUT',
        body: JSON.stringify({
          _id: user._id,
          nickname,
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.savedNickname = true;
            this.props.loginStore.updateProfile({ nickname });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (password !== '') {
      fetch('/api/pwcheck', {
        method: 'POST',
        body: JSON.stringify({
          pass: currentPassword,
          oldpassword: user.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            fetch('/api/pwhash', {
              method: 'POST',
              body: JSON.stringify({
                pass: password
              }),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(res => res.json())
              .then(data => {
                const password = data.hash;
                fetch(`/api/users/${user._id}/setting/password`, {
                  method: 'PUT',
                  body: JSON.stringify({
                    _id: user._id,
                    password,
                  }),
                  headers: { 'Content-Type': 'application/json' }
                })
                document.getElementById('currentPassword').value = '';
                document.getElementById('setNewPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                this.savedPassword = true;
                this.props.loginStore.updateProfile({ password });
              })
              .catch(err => {
                console.log(err);
              });
          }
          else {
            this.isNotCorrectPass = true;
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    if (imageFormData) {
      fetch('/api/upload', {
        method: 'POST',
        body: imageFormData
      })
        .then(res => res.json())
        .then(res => {
          this.props.loginStore.updateProfile({ image: res.path });
        });
    }

    await sleep(200);
    this.resetInput();
    this.closeModal();
  }
}