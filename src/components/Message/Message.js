@observer
 export default class Message extends Component {


    //  NumberList(props) {
    //     const numbers = props.numbers;
    //     const listItems = numbers.map((number) =>
    //       <li>{number}</li>
    //     );
    //     return (
    //       <ul>{listItems}</ul>
    //     );
    //   }

      messageList(props){
          const key = props.id;
          const sender = props.sender;
          const time = props.time;
          const text = props.text;
          const getClass = findClass(props.sender);

      }

      findClass(sender){
          if(sender===this.stores.Login.user.nickname){
              return "me";
          }else{
              return "message-data";
          }
      }
 }