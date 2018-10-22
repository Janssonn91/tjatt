import './Server.scss';
@observer export default class Server extends Component{

@observable urlToSet = '';


  start(){
    this.createStoreConnectedProperties({
      repo: []
    });
  }

  editText(e){
    this.urlToSet = e.currentTarget.value;
  }
  checkForEnter(e){
    if(e.key ==='Enter'){
    this.submit()
    }
  } 

  submit = () => {
    console.log(this.urlToSet)
    fetch('/api/test', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({url: this.urlToSet}), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }


  
}