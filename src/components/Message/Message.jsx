<Fragment>
  <DeleteMessageModal {...this.sendToDeleteMessageModal} />
  {this.props.histories.map((message, i) => {
    console.log(message);
    return (
      message.sender === (this.props.userStore.user._id) ?
        <li key={i} className="clearfix">
          <div className="me">
            <span>
              <img alt="user-img" src={this.props.userStore.user.image || "/images/placeholder.png"} />
            </span>&nbsp;&nbsp;
            <span className="message-data-name">
              {this.props.userStore.user.nickname}
            </span>&nbsp;
            <span className="message-data-time">{message.time}</span>
          </div>
          <div className="message my-message">
            {message.text}
            <i className="fas fa-times" onClick={this.deleteMessageModalToggle.bind(this)}></i>
          </div>
        </li> :
        <li key={i} className="clearfix">
          <div className="message-data">
            {
              message.status === "online" ?
                <span className="online circle">
                  <i className="fas fa-circle"></i>
                </span> :
                <span className="offline circle">
                  <i className="fas fa-circle"></i>
                </span>
            }&nbsp; &nbsp;
            <span>
              <img alt="user-img" src={message.image || "/images/placeholder.png"} />
            </span>&nbsp; &nbsp;
            <span className="message-data-name">{message.sender}</span>
            <span className="message-data-time">{message.time}</span>
          </div>
          <div className="message other-message">
            {message.text}
          </div>
        </li>
    )
  })
  }
</Fragment>