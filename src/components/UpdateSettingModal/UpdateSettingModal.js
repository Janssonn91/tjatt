import './UpdateSettingModal.scss';

@inject('loginStore') @observer export default class UpdateSettingModal extends Component {

  @observable image = "";
  @observable nickname = "";
  @observable currentPassword = "";
  @observable password = "";


}