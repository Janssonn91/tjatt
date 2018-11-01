import './UpdateSettingModal.scss';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = "";
  @observable nickname = "";
  @observable currentPassword = "";
  @observable password = "";


  onFileChange = (event) => {
    const formData = new FormData();
    formData.append('id', this.props.loginStore.user._id);
    formData.append('file', event.target.files[0]);
    this.image = formData;
  }
}