<li key={this.props.key} className="clearfix py-1">
  <div
    className="posted-channelname"
    style={{ fontSize: 12, color: "gray" }}>
    posted in <strong>{this.props.channelStore.channelDict[this.props.message.channel].channelname}</strong>
  </div>
  <div className="message-data">
    <span>
      <img alt="user-img" src={this.props.channelStore.userDict[this.props.message.sender].img || "/images/placeholder.png"} />
    </span>&nbsp; &nbsp;
    <span className="message-data-name">{this.props.channelStore.userDict[this.props.message.sender].name}</span>
    <span className="message-data-time">{this.formattedTime(this.props.message.time)}</span>
  </div>
  <div
    className={
      `message ${this.props.channelStore.userDict[this.props.message.sender].name === this.props.userStore.user.username ? 'my-message' : 'other-message'}
      ${this.props.message.contentType === 'image' ? 'removeBG' : ''}
      ${this.props.message.contentType === 'code' ? 'code-snippet' : ''}`
    }>
    {this.props.message.contentType === 'text' && this.props.message.text}
    {this.props.message.contentType === 'file' && <a className="text-light files" href={this.props.message.filePath} download={this.props.message.originalName}>{this.props.message.originalName}<i className="far fa-file-alt pl-2"></i></a>}
    {this.props.message.contentType === 'image' && <div className="img-upload-holder"><img src={this.props.message.filePath} className="upload-image" alt="chat-img" onClick={() => { this.toggleChatModal(); this.currentImage = this.props.message.filePath; this.originalName = this.props.message.originalName }} /></div>}
    {this.props.message.contentType === 'code' && <div data-index={i} className={`${!this.fullHeightSnippet.some(obj => obj.index === i) ? 'highlight-small' : 'highlight-big'}`}><SyntaxHighlighter style={vs2015} showLineNumbers={true}>{this.props.message.text}</SyntaxHighlighter>
      <Button onClick={() => this.toggleSnippetHeight(i)} color="secondary" className="full-height-btn"><i className={`fas fa-arrow-${this.fullHeightSnippet.some(obj => obj.index === i) ? 'up' : 'down'}`}></i></Button></div>}
  </div>
  <div className="float-right">
    {this.props.userStore.myStars.some(s => s._id === this.props.message._id) ?
      <i className="fas fa-star"
        onClick={() => this.props.userStore.updateMyStars(this.props.message, true)}>
      </i> :
      <i className="far fa-star"
        onClick={() => this.props.userStore.updateMyStars(this.props.message, false)}>
      </i>
    }
  </div>
</li>