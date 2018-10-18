import './Signup.scss';

export default class Signup extends Component {

  usernameToSet;
  passWordToSet;
  nicknameToSet;
  person;

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

  async createUser() {
    this.person = {
      name : this.usernameToSet,
      password : this.passWordToSet,
      nickname : this.nicknameToSet
    };
    console.log(this.person);
    let test = new User();
    console.log(test);
    await test.save({
      name: this.usernameToSet,
      password: this.passWordToSet,
      nickname: this.nicknameToSet
    });
    console.log('hej din get');
  }
}