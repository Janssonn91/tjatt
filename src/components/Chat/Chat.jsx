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
  <Row>
    <Col>
      <div className="chat-history px-3 mr-1">
        <ul ref="messageList" onScroll={this.onScroll}>
          <Message {...this.sendToChatHistory} />
        </ul>
      </div>
    </Col>
  </Row>
  <Row className="formRow">
    <Col className="p-0">
      <Form inline className="chat-message py-2 clearfix">
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
        <FormGroup className="m-0 messageAreaForm">
          <Label for="messageArea" className="d-none">Message</Label>
          <Input type="textarea" name="text" id="messageArea"
            placeholder="Write your message here"
            value={this.inputMessage}
            onChange={e => this.inputMessage = e.currentTarget.value}
            onKeyPress={e => e.key === 'Enter' && this.sendMessage(e.preventDefault())} />
        </FormGroup>
        <Button className="send p-0" onClick={e => this.sendMessage()}>
          <img src="/images/sent-mail.svg" alt="send mail" style={{ width: 23 }} />
        </Button>
      </Form>
    </Col>
  </Row>
</Fragment>