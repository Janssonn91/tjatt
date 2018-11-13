<Fragment>
  <DeleteMessageModal {...this.sendToDeleteMessageModal} />
  {this.props.channelStore.channelChatHistory.map((message, i) => {
    // this.props.channelStore.getSenderName(message.sender).then(data=>console.log(data))
    return (
      message.sender === (this.props.loginStore.user._id) ?
        <li key={i} className="clearfix">
          <div className="me">
            <span>
              <img alt="user-img" src={this.props.loginStore.user.image || "/images/placeholder.png"} />
            </span>&nbsp;&nbsp;
            <span className="message-data-name">
              {this.props.loginStore.user.nickname}
            </span>&nbsp;
            {/* <span className="message-data-time">{message.time}</span> */}
          </div>
          <div className="message my-message">
            {message.text}
            <i className="fas fa-times" onClick={this.deleteMessageModalToggle.bind(this)}></i>
          </div>
        </li> :


        <li key={i} className="clearfix">
          <div className="message-data">
            {
              this.props.loginStore.onLineUsers.some(id => id === message.sender) ?
                <span className="online circle">
                  <i className="fas fa-circle"></i>
                </span> :
                <span className="offline circle">
                  <i className="fas fa-circle"></i>
                </span>
            }&nbsp; &nbsp;
            <span>
              <img alt="user-img" src={this.props.channelStore.userDict[message.sender].img || "/images/placeholder.png"} />
            </span>&nbsp; &nbsp;
              <span className="message-data-name">{this.props.channelStore.userDict[message.sender].name}</span>
            {/* <span className="message-data-time">{message.time}</span> */}
          </div>
          <div className="message other-message">
            {message.text}
          </div>
        </li>
    )
  })
  }
</Fragment>