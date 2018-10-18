import './Signup.scss';

export default class Signup extends Component {

  usernameToSet;
  passWordToSet;
  nicknameToSet;

  async start() {
    
  }

  usernameChange(e){
    this.usernameToSet = e.currentTarget.value;
    //console.log(this.usernameToSet);
  }

  passwordChange(e){
    this.passWordToSet = e.currentTarget.value;
    //console.log(this.passWordToSet);
  }

  nicknameChange(e){
    this.nicknameToSet = e.currentTarget.value;
  }

  async createUser(e){
    let person = await User.create({
        name : this.usernameToSet,
        password : this.passWordToSet,
        nickname : this.nicknameToSet
    });
  }
}