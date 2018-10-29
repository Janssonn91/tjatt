< Fragment > {

  this.props.histories.map((message) =>
    message.sender === (this.props.loginStore.user.nickname || this.props.loginStore.user.username)
      ? <li key={message.id} className="clearfix ">
        <div className="me">
          <span className="message-data-time">{message.time}</span>
          &nbsp;
            <span className="message-data-name ">{message.sender}
          </span>
        </div>
        <div className="message my-message">
          {message.text}
        </div>
      </li>
      : <li key={message.id} className="clearfix ">
        <div className="message-data">
          {message.status === "online" ? <span className="online circle"><i className="fas fa-circle"></i></span> : <span className="offline circle"><i className="fas fa-circle"></i></span>}

          &nbsp;<span className="message-data-name">{message.sender}</span>
          <span className="message-data-time">{message.time}</span>
        </div>
        <div className="message other-message">
          {message.text}
        </div>
      </li>)
}
</Fragment>