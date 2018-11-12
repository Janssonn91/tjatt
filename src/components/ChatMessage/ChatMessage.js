@inject('loginStore', 'channelStore') @observer
export default class ChatMessage extends Component {
  @observable senderName = "";
  @observable senderImg = "";

async getSenderName(id){
  let s ={};
  if(id!==this.props.loginStore.user._id){
    s = await this.props.channelStore.getSenderName(id)
    this.senderName= s.name;
    this.senderImg = s.img;
  }else{
    return "sender";
  }

}


}

// {
//               message.status === "online" ?
//             <span className="online circle">
//               <i className="fas fa-circle"></i>
//             </span> :
//             <span className="offline circle">
//               <i className="fas fa-circle"></i>
//             </span>
//             }&nbsp; &nbsp;
//             <span>
//               <img alt="user-img" src={message.image || "/images/placeholder.png"}/>
//             </span>&nbsp; &nbsp;
//               <span className="message-data-name">{this.thisSender.nickname}</span> 
//             {/* <span className="message-data-time">{message.time}</span> */}
//           </div>
//           <div className="message other-message">
//             {message.text}