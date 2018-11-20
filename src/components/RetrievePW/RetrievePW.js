import './RetrievePW.scss';

@withRouter @observer export default class RetrievePW extends Component {

  @observable useremailToRetrieve = '';
  @observable validEmail = true;
  @observable emailDontExist = false;
  @observable successInfo = false;

  useremailChange(e) {
    this.useremailToRetrieve = e.currentTarget.value;
    this.validateEmail();
  }

  validateEmail() {
    this.validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.useremailToRetrieve);
  }

  removeEmailError = (e) => {
    this.emailDontExist = false;
    this.successInfo = false;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.useremailToRetrieve;
    fetch('/api/mail-password', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          fetch('/api/send-password', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
          })
          this.successInfo = true;
        }
        else {
          this.emailDontExist = true;
        }
      })
        //.then(res => res.json())
        .catch(err => {
          console.log("err", err)
        })
  };

}