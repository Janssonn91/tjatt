<Fragment>
  <AddMemberModal {...this.sendToAddModal} />
  <AddMemberModal {...this.sendToDeleteModal} />
  <Row className="chat-header m-0 p-0">
    <Col sm="12" className="chat-about pl-3 pl-md-4">
      <Button className="mobil-menu d-inline-block d-md-none" onClick={this.props.toChat}>
        <i className="fas fa-ellipsis-v"></i>
      </Button>
      <span className="chat-with pl-0">Chat with channel name</span>
      <span className="dialog-icon p-0 mr-1 mr-sm-3">
        <Dropdown isOpen={this.dropdownOpen} toggle={this.dropdownToggle}>
          <DropdownToggle className="" tag="span" data-toggle="dropdown" aria-expanded={this.dropdownOpen}>
            <i className="fas fa-users"></i>
            {/*<i className="fas fa-user"></i> */}
          </DropdownToggle>
          <DropdownMenu className="channel-management">
            <DropdownItem className="py-2 px-3" header>Group Name</DropdownItem>
            <DropdownItem className="m-0" divider />
            <div className="channel-manage">
              <DropdownItem className="py-2 px-3" onClick={this.addMemberModalToggle.bind(this)}>
                Add members
              </DropdownItem>
              <DropdownItem className="py-2 px-3" onClick={this.deleteMemberModalToggle.bind(this)}>
                Delete members
              </DropdownItem>
            </div>
            <DropdownItem className="m-0" divider />
            <DropdownItem className="leave-group py-2 px-3">Leave group</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
    </Col>
  </Row>
  <hr className="mt-0 mb-2" />
  <div className="chat-history px-3 mr-1">
    <ScrollableFeed forceScroll={true}>
      <ul ref="messageList" onScroll={this.onScroll}>
        <Message user={this.props.user}{...this.sendToChatHistory} />

        {/* <li className="clearfix ">
        <div className=" me">
          <span className="message-data-time" >10:10 AM, Today</span> &nbsp;
          <span className="message-data-name " >{this.stores.Login.user.nickname}</span>
        </div>
        <div className="message my-message">
          How are you?
        </div>
      </li>
      <li>
        <div className="message-data">
          <span className="online circle"> <i className="fas fa-circle"></i></span> &nbsp;
          <span className="message-data-name">Other</span>
          <span className="message-data-time">10:12 AM, Today</span>
        </div>
        <div className="message other-message">
          I am fine, thank you. And you?
        </div>
      </li>
      <li>
        <div className="message-data">
          <span className="offline circle"><i className="fas fa-circle"></i></span> &nbsp;
          <span className="message-data-name">Another</span>
          <span className="message-data-time">10:14 AM, Today</span>
        </div>
        <div className="message other-message">
          Good!
        </div>
      </li> */}
      </ul>
      <div style={{ float: "left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
      </div>
    </ScrollableFeed>
  </div>
  <div className="chat-message pt-2 clearfix">
    <Form inline>

      <ButtonDropdown direction="up" isOpen={this.isOpen} toggle={e => this.toggle()} className="btn-dropup">
        <DropdownToggle className="p-0" caret>
          <i className="fas fa-plus"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem><i className="fas fa-file"></i>&nbsp; &nbsp; Document</DropdownItem>
          <DropdownItem><i className="fas fa-file-image"></i>&nbsp; &nbsp; Image</DropdownItem>
          <DropdownItem><i className="fas fa-code"></i>&nbsp; Code or text snippet</DropdownItem>
          <Link to="server" tabIndex="-1">
            <DropdownItem><i className="fas fa-code-branch"></i>&nbsp; &nbsp;Git repository</DropdownItem>
          </Link>
        </DropdownMenu>
      </ButtonDropdown>
      <FormGroup className="m-0">
        <Label for="messageArea" className="d-none">Message</Label>
        <Input className="p-2" type="textarea" name="text" id="messageArea"
          placeholder="Write your message here"
          value={this.inputMessage}
          onChange={e => this.inputMessage = e.currentTarget.value}
          onKeyPress={e => e.key === 'Enter' && this.sendMessage(e.preventDefault())} />
      </FormGroup>
      <Button className="send p-0" disabled={!this.inputMessage} onClick={e => this.sendMessage()}>Send</Button>
    </Form>
  </div>
</Fragment>