<Fragment>
  <AddDeleteMemberModal {...this.sendToAddDeleteModal} />
  <ViewMembersModal {...this.sendToViewMembersModal} />
  <LeaveGroupModal {...this.sendToLeaveModal} />
  <SnippetModal uploadError={this.fileUploadError} snippetVal={this.snippetModal} snippetToggle={this.toggleSnippet} codeFileMethod={this.codefileHandler} fileValueMethod={this.getFileValue} fileValue={this.codefileValue} textMethod={this.codeTextHandler} />
  {this.props.channelStore.currentChannel ?
    <Fragment>
      <Row className="chat-header m-0 p-0">
        <Col sm="12" className="chat-about pl-3 pl-md-4">
          <Button
            className="mobil-menu d-inline-block d-md-none"
            onClick={e => this.props.channelStore.showMenu()}>
            <h2 className="sr-only">Show sidebar</h2>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          {/* <span id="channelName"></span>  */}
          <span className="chat-with">{this.props.channelStore.currentChannel.channelname}</span>
          {this.props.channelStore.currentChannel.group
            ? <div className="btn group-menu">
              <span className="dialog-icon p-0">
                <Dropdown isOpen={this.dropdownOpen} toggle={this.dropdownToggle}>
                  <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={this.dropdownOpen}
                  >
                    <h2 className="sr-only">Group settings</h2>
                    <i className="fas fa-users"></i>
                  </DropdownToggle>
                  <DropdownMenu className="channel-management">
                    <DropdownItem className="py-2 px-3 dropdown-header" header>{this.props.channelStore.currentChannel.channelname}</DropdownItem>
                    <DropdownItem className="m-0" divider />
                    <div className="channel-manage">
                      <DropdownItem
                        className="py-2 px-3"
                        onClick={this
                          .addDeleteMemberModalToggle
                          .bind(this)}>
                        Add/Delete members
                    </DropdownItem>
                      <DropdownItem
                        className="py-2 px-3"
                        onClick={this
                          .viewMembersModalToggle
                          .bind(this)}>
                        View members
                      </DropdownItem>
                      {this.props.channelStore.currentChannelAdmins.includes(this.props.userStore.user._id) && (this.props.channelStore.currentChannelAdmins.length < this.props.channelStore.currentGroupMembers.length) &&
                        <DropdownItem className="leave-group py-2 px-3" onClick={this.viewMembersModalToggle.bind(this)}>Make members admin</DropdownItem>
                      }
                    </div>
                    <DropdownItem className="m-0" divider />
                    <DropdownItem className="leave-group py-2 px-3" onClick={this.leaveGroupModalToggle.bind(this)}>Leave group
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </span>
            </div>
            :
            <span style={{ width: 30 }}>{null}</span>
          }
        </Col>
      </Row>
      <hr className="mt-0 mb-2" />
      <Row>
        <Col className="pr-0">
          <ul className="chat-history pl-2 mr-1">
            <ChatMessage />

          </ul>
        </Col>
      </Row>
      <Row className="formRow">
        <Col className="p-0">
          <Form inline className="chat-message py-2 clearfix" onSubmit={e => e.preventDefault()}>
            <Dropdown
              direction="up"
              isOpen={this.isOpen}
              toggle={e => this.toggle()}
              className="btn-dropup">
              <DropdownToggle className="p-0" caret>
                <h2 className="sr-only">More functions</h2>
                <i className="fas fa-plus"></i>
              </DropdownToggle>
              <DropdownMenu>
                <div className="dropdown-item d-flex">
                  <input
                    type="file"
                    id="file"
                    className="file d-none"
                    name="file"
                    onChange={e => this.textfileHandler(e)}
                  />
                  <label htmlFor="file" className="document-file float-left py-auto align-self-center">
                    <i name="file" className="fas fa-file"></i>&nbsp; &nbsp; Document
                  </label>
                </div>
                <DropdownItem>
                  <i className="fas fa-file-image"></i>&nbsp; &nbsp; Image
                </DropdownItem>
                <DropdownItem onClick={() => this.toggleSnippet()}>
                  <i className="fas fa-code"></i>&nbsp; Code or text snippet
                </DropdownItem>
                <DropdownItem onClick={() => this.openGitAppsSidebarHandler()}>
                  <i className="fas fa-code-branch"></i>&nbsp; &nbsp;Git repository</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <FormGroup className="m-0 messageAreaForm">
              <Label for="messageArea" className="d-none">Message</Label>
              <Textarea
                minRows={1}
                maxRows={10}
                useCacheForDOMMeasurements
                style={{ boxSizing: 'border-box' }}
                type="textarea"
                name="text"
                id="messageArea"
                placeholder="Write your message here"
                value={this.inputMessage}
                onChange={e => this.inputMessage = e.currentTarget.value}
                onKeyPress={e => e.key === 'Enter' && this.sendMessage(e.preventDefault())}
              />

              <Dropdown isOpen={this.emojiDropdownOpen} toggle={this.emojiDropdownToggle}>
                <DropdownToggle className="emoji-container bg-light">
                  <div
                    onMouseEnter={() => this.setButtonHovered(true)}
                    onMouseLeave={() => this.setButtonHovered(false)}
                  >
                    <h2 className="sr-only">Emoji</h2>
                    {this.buttonIsHovered ? <i className="hover fas fa-grin emojiOpener"></i> : <i className="far fa-smile emojiOpener"></i>}
                  </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-left">
                  <EmojiPicker className="emojies" onEmojiClick={this.getEmoji} />
                </DropdownMenu>
              </Dropdown>
              <Dropdown isOpen={this.gifPicker} toggle={this.gifToggler}>
                <DropdownToggle className="gif-container bg-light">
                  <div>
                    <img src="/images/gif.logo.jpg" className="gif-opener" alt="open-gif" />
                  </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-left">
                  <GiphySelect onEntrySelect={(entry) => this.sendGif(entry)} theme={{ select: 'gifcomponent', listItem: 'gifItem' }} />
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <Button className="send p-0" onClick={e => this.sendMessage()}>
              <h2 className="sr-only">Send message</h2>
              <img
                src="/images/sent-mail.svg"
                alt="send mail"
                style={{ width: 23 }} />
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment> :
    <Fragment>
      <Row className="chat-header m-0 p-0">
        <Col className="chat-about pl-3 col-12 d-md-none">
          <Button
            className="mobil-menu d-inline-block d-md-none"
            onClick={e => this.props.channelStore.showMenu()}>
            <h2 className="sr-only">Show sidebar</h2>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </Col>
      </Row>
      <Row>
        <Infopage />
      </Row>
    </Fragment>

  }

</Fragment>