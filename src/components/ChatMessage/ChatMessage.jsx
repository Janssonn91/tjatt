<Fragment>
  <ChatImgModal toggleVal={this.chatImageModal} toggleModal={this.toggleChatModal} imgPath={this.currentImage} title={this.originalName} />
  <DeleteMessageModal {...this.sendToDeleteMessageModal} />
  <ScrollableFeed>
    {this.props.channelStore.channelChatHistory.map((message, i) => {
      // this.props.channelStore.getSenderName(message.sender).then(data=>console.log(data))
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
             <span className="message-data-time">{this.formattedTime(message.time)}</span>
            </div>
            <div className={`message my-message clearfix ${message.contentType === 'image' ? 'removeBG' : ''} ${message.contentType === 'code' ? 'code-snippet' : ''}`}>
              {message.contentType === 'text' && message.text}
              {message.contentType === 'file' && <a className="text-light files" href={message.filePath} download={message.originalName}>{message.originalName}<i className="far fa-file-alt pl-2"></i></a>}
              {message.contentType === 'image' && <div className="img-upload-holder"><img src={message.filePath} className="upload-image" alt="chat-img" onClick={() => { this.toggleChatModal(); this.currentImage = message.filePath; this.originalName = message.originalName }} /></div>}
              {message.contentType === 'code' && <div data-index={i} className={`${!this.fullHeightSnippet.some(obj => obj.index === i) ? 'highlight-small' : 'highlight-big'}`}><Highlight>{message.text}</Highlight>
                <Button onClick={() => this.toggleSnippetHeight(i)} color="secondary" className="full-height-btn"><i className={`fas fa-arrow-${this.fullHeightSnippet.some(obj => obj.index === i) ? 'up' : 'down'}`}></i></Button></div>}
              <ButtonDropdown className="d-none" isOpen={this.dropdownOpen} direction="up" toggle={this.dropdownToggle}>
                <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={this.dropdownOpen}>
                  <i className="fas fa-pen"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header className="py-2 px-3 dropdown-header">Configure message</DropdownItem>
                <DropdownItem className="m-0"divider/> */}
                  <DropdownItem className="py-2 px-3 delete-message" onClick={this.deleteMessageModalToggle.bind(this)}>Delete message</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </li> :


          <li key={i} className="clearfix">
            <div className="message-data">
              {
                this.props.channelStore.userDict[message.sender].status ?
                  <span className="circles">
                    <i className="fas fa-circle online"></i>
                  </span> :
                  <span className="circles">
                    <i className="fas fa-circle offline"></i>
                  </span>
              }&nbsp; &nbsp;
            <span>
                <img alt="user-img" src={this.props.channelStore.userDict[message.sender].img || "/images/placeholder.png"} />
              </span>&nbsp; &nbsp;
              <span className="message-data-name">{this.props.channelStore.userDict[message.sender].name}</span>
              <span className="message-data-time">{this.formattedTime(message.time)}</span>
            </div>
            <div className={`message other-message ${message.contentType === 'image' ? 'removeBG' : ''} ${message.contentType === 'code' ? 'code-snippet' : ''}`}>
              {message.contentType === 'text' && message.text}
              {message.contentType === 'file' && <a className="text-light files" href={message.filePath} download={message.originalName}>{message.originalName}<i className="far fa-file-alt pl-2"></i></a>}
              {message.contentType === 'image' && <div className="img-upload-holder"><img src={message.filePath}
                className="upload-image" /></div>}
              {message.contentType === 'code' && <div data-index={i} className={`${!this.fullHeightSnippet.some(obj => obj.index === i) ? 'highlight-small' : 'highlight-big'}`}><Highlight>{message.text}</Highlight>
                <Button onClick={() => this.toggleSnippetHeight(i)} color="secondary" className="full-height-btn"><i className={`fas fa-arrow-${this.fullHeightSnippet.some(obj => obj.index === i) ? 'up' : 'down'}`}></i></Button></div>}
            </div>
          </li>
      )
    })
    }
  </ScrollableFeed>
</Fragment>