<Fragment> 
  <AddMemberModal {...this.sendToAddModal} /> 
  <DeleteMemberModal {...this.sendToDeleteModal} />
  <ViewMembersModal {...this.sendToViewMembersModal} />
  {this.props.channelStore.currentChannel ?
    <Fragment>
      <Row className="chat-header m-0 p-0">
        <Col sm="12" className="chat-about pl-3 pl-md-4">
          <Button
            className="mobil-menu d-inline-block d-md-none"
            onClick={e => this.props.channelStore.showMenu()}>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
           {/* <span id="channelName"></span>  */}
         <span className="chat-with">{this.props.channelStore.channelName}</span> 
          {this.props.channelStore.currentChannelGroup
            ? <span className="dialog-icon p-0">

              <Dropdown isOpen={this.dropdownOpen} toggle={this.dropdownToggle}>
                <DropdownToggle
                  tag="span"
                  data-toggle="dropdown"
                  aria-expanded={this.dropdownOpen}
                  >
                  <i className="fas fa-users"></i>
                </DropdownToggle>
                <DropdownMenu className="channel-management">
                  <DropdownItem className="py-2 px-3 dropdown-header" header>{this.props.channelStore.channelName}</DropdownItem>
                  <DropdownItem className="m-0" divider />
                  <div className="channel-manage">
                    <DropdownItem
                      className="py-2 px-3"
                      onClick={this
                        .addMemberModalToggle
                        .bind(this)}>
                      Add members
                  </DropdownItem>
                  <DropdownItem
                      className="py-2 px-3"
                      onClick={this
                        .viewMembersModalToggle
                        .bind(this)}>
                      View members
                  </DropdownItem>
                    <DropdownItem
                      className="py-2 px-3"
                      onClick={this
                        .deleteMemberModalToggle
                        .bind(this)}>
                      Delete members
                  </DropdownItem>
                  </div>
                  <DropdownItem className="m-0" divider />
                  <DropdownItem className="leave-group py-2 px-3 ">Leave group</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
            :
            <span className="dialog-icon p-0">

              <Dropdown isOpen={this.dropdownOpen} toggle={this.dropdownToggle}>
                <DropdownToggle className="" tag="span" data-toggle="dropdown" aria-expanded={this.dropdownOpen}>
                  <i className="fas fa-user"></i>
                </DropdownToggle>
                <DropdownMenu className="channel-management">
                  <DropdownItem className="py-2 px-3" onClick={this.addMemberModalToggle.bind(this)}>
                    Add members
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          }
        </Col>
      </Row> < hr className="mt-0 mb-2" /> <Row>
        <Col>
          <div className="chat-history px-3 mr-1">
            <ScrollableFeed forceScroll={true}>
              <ul ref="messageList" onScroll={this.onScroll}>
                <Message {...this.sendToChatHistory} />
              </ul>
              <div
                style={{
                  float: "left",
                  clear: "both"
                }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}></div>
            </ScrollableFeed>
          </div>
        </Col>
      </Row> < Row className="formRow" > <Col className="p-0">
        <Form inline className="chat-message py-2 clearfix">
          <ButtonDropdown
            direction="up"
            isOpen={this.isOpen}
            toggle={e => this.toggle()}
            className="btn-dropup">
            <DropdownToggle className="p-0" caret>
              <i className="fas fa-plus"></i>
            </DropdownToggle>
            {this.props.channelStore.amIAdmin ?

              <DropdownMenu>
                <DropdownItem>
                  <i className="fas fa-file"></i>&nbsp; &nbsp; Document</DropdownItem>
                <DropdownItem>
                  <i className="fas fa-file-image"></i>&nbsp; &nbsp; Image</DropdownItem>
                <DropdownItem>
                  <i className="fas fa-code"></i>&nbsp; Code or text snippet</DropdownItem>
                <Link to="server" tabIndex="-1">
                  <DropdownItem>
                    <i className="fas fa-code-branch"></i>&nbsp; &nbsp;Git repository</DropdownItem>
                </Link>
              </DropdownMenu>
              :

              <DropdownMenu>
                <DropdownItem>
                  <i className="fas fa-file"></i>&nbsp; &nbsp; Document</DropdownItem>
                <DropdownItem>
                  <i className="fas fa-file-image"></i>&nbsp; &nbsp; Image</DropdownItem>
                <DropdownItem>
                  <i className="fas fa-code"></i>&nbsp; Code or text snippet</DropdownItem>
              </DropdownMenu>

            }

          </ButtonDropdown>



          <FormGroup className="m-0 messageAreaForm">
            <Label for="messageArea" className="d-none">Message</Label>

            <Input
              type="textarea"
              name="text"
              id="messageArea"
              placeholder="Write your message here"
              value={this.inputMessage}
              onChange={e => this.inputMessage = e.currentTarget.value}
              onKeyPress={e => e.key === 'Enter' && this.sendMessage(e.preventDefault())} />
            <Dropdown isOpen={this.emojiDropdownOpen} toggle={this.emojiDropdownToggle}>
              <DropdownToggle className="emoji-container bg-light">
                <i className="far emojiOpener">😃</i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-left">
                <EmojiPicker className="emojies" onEmojiClick={this.getEmoji} />
              </DropdownMenu>
            </Dropdown>
          </FormGroup>
          <Button className="send p-0" onClick={e => this.sendMessage()}>
            <img
              src="/images/sent-mail.svg"
              alt="send mail"
              style={{
                width: 23
              }} />
          </Button>
        </Form>
      </Col>
      </Row>
    </Fragment> :
    <Fragment>
      <Row className="chat-header m-0 p-0">
        <Col sm="12" className="chat-about pl-3 pl-md-4">
          <Button
            className="mobil-menu d-inline-block d-md-none"
            onClick={e => this.props.channelStore.showMenu()}>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </Col>
      </Row>
      <h1>Place holder</h1>
    </Fragment>}

</Fragment>