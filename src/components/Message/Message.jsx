< Fragment >


  {this.props.histories.map((message, i) => 
  
     <li key={i} className="clearfix ">
    <div className={this.props.getClass(message.sender)}>
      <span className="message-data-time">{message.time}</span>
      &nbsp;
      <span className="message-data-name ">{message.sender}
      </span>
    </div>
    <div className="message my-message">
      {message.text}
    </div>
  </li> 
    )
  }

  </Fragment>