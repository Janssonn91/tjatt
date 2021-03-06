<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder pl-3 pt-4">
        <CardImg src={this.props.userStore.user.image || imgPath} alt="user's photo" />
        <Dropdown isOpen={this.collapseOpen} toggle={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5 className="ml-1 username">{this.props.userStore.user.nickname || this.props.userStore.user.username}</h5>
          </DropdownToggle >
          <DropdownMenu className="p-0" tag="div">
            <DropdownItem className="px-3 py-2 btn-li" tag="li" onClick={() => this.openModalupdateSetting()}>Settings</DropdownItem>
            <DropdownItem className="m-0" divider />
            <DropdownItem className="px-3 py-2 btn-li" tag="li" onClick={e => this.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <hr className="mt-0" />
    <Nav vertical className="menu">
      <NavLink className="star-nav pl-2 pt-0 pr-0" to={this.props.match.params.id === undefined ? this.props.userStore.user.username + "/stars" : "stars"}>
        <i
          className={this.props.match.params.id === "stars" ? "fas fa-star pr-3 pr-md-2 active" : "fas fa-star pr-3 pr-md-2"}
          id="starred"
          onClick={() => this.props.channelStore.showChat()}>
        </i>
        <Tooltip placement="right" isOpen={this.tooltipOpen} target="starred" toggle={() => this.toggleTooltip()}>
          Show starred items
        </Tooltip>
      </NavLink>
      {this.props.channelStore.unreadSystemMessages.length > 0 ?
        <NavLink className="system-message pt-0 pl-2 pr-0">
          <NavItem onClick={this.openSystemMessageModal.bind(this)}>
            <span className="system-message-link d-inline-block">System Message</span>
            <span className="message-number float-right mr-2">
              <Badge color="danger">{this.props.channelStore.unreadSystemMessageNum}</Badge>
            </span>
          </NavItem>
        </NavLink>
        : <span className="d-none"> 0</span>}

      <NavLink className="contacts-nav pl-2 pt-0 pr-0">
        <NavItem onClick={this.openContacts}>My Contacts {!this.contactsOpen ? <i className="fas fa-sort-down arrow-down"></i> : <i className="fas fa-sort-up arrow-up"></i>}</NavItem>
        <i onClick={this.openModalAddNewUser.bind(this)} className="fas fa-plus mr-1"></i>
      </NavLink>
      {this.props.channelStore.unreadSystemMessage ?
        <Collapse className="pl-2" isOpen={this.systemMessageOpen}>
          <Card className="contactsCollapse border-0 m-0">
            <CardBody className="p-0">
              {this.props.channelStore.contactChannels.length > 0 ?
                <div id="contactsRender"></div>
                : <h6 className="text-secondary pl-3 pt-1">Add a contact on the <strong className="plus-text">+</strong></h6>
              }
              {this.props.channelStore.contactChannels.map((channel, i) =>
                channel.open ?
                  <Link
                    to={`/${this.props.userStore.user.username}/${channel.channelname}`}
                    key={i}
                    onClick={() => this.props.channelStore.changeChannel(channel)}
                  >
                    <div className="nav-link pl-2 py-1 pr-0 contacts">
                      <CardImg className="mr-2 d-inline-block" src={channel.image || "/images/placeholder.png"} alt="user's photo" />
                      <span className="d-inline-block">{channel.channelname}</span>
                      {this.props.currentChannel.messageNum > 0 ? <span className="message-number float-right mr-1">
                        <Badge color="danger">{this.props.currentChannel.messageNum}</Badge>
                      </span> : <span className="d-inline-block float-right"><i className="far fa-times-circle align-middle"></i></span>}
                    </div>
                  </Link>
                  :
                  <div key={i}></div>
              )}
            </CardBody>
          </Card>
        </Collapse>
        :
        <div></div>
      }
      <Collapse className="pl-2" isOpen={this.contactsOpen}>
        <Card className="contactsCollapse border-0 m-0">
          <CardBody className="p-0">
            {this.props.channelStore.contactChannels.length > 0 ?
              <div id="contactsRender"></div>
              : <h6 className="text-secondary pt-1">Add a contact on the <strong className="plus-text">+</strong></h6>
            }
            {this.props.channelStore.contactChannels.map((channel, i) =>
              channel.open ?
                <Link
                  to={`/${this.props.userStore.user.username}/${channel.channelname}`}
                  key={i}
                  onClick={() => setTimeout(this.loadChannelFromUrl.bind(this), 10)}
                >
                  <div className="nav-link py-1 pr-1 contacts">
                    <CardImg className="mr-2 d-inline-block" src={channel.image || "/images/placeholder.png"} alt="user's photo" />
                    <span className="d-inline-block">{channel.channelname}</span>
                    {channel.messageNum > 0 ?
                      <span className="message-number float-right mr-1">
                      
                        <Badge color="danger">{channel.messageNum}</Badge>
                      </span>
                      :
                      <span
                        className="d-inline-block float-right delete"
                        onClick={() => this.openModalDeleteContact(channel)} >
                        <i className="far fa-times-circle"></i>
                      </span>}
                  </div>
                </Link>
                :
                <div key={i}></div>
            )}
          </CardBody>
        </Card>
      </Collapse>
      <NavLink className="contacts-nav pl-2 pr-0">
        <NavItem onClick={this.openGroups}>My Groups {!this.groupsOpen ? <i className="fas fa-sort-down arrow-down"></i> : <i className="fas fa-sort-up arrow-up"></i>}</NavItem>
        <i onClick={this.openModalCreateGroup.bind(this)} className="fas fa-plus mr-1"></i>
      </NavLink>
      <Collapse className="pl-2" isOpen={this.groupsOpen}>
        <Card className="groupCollapse border-0 m-0">
          <CardBody className="p-0">
            {this.props.channelStore.groupChannels.length > 0 ?
              this.props.channelStore.groupChannels.map((channel, i) =>
                <Link
                  to={`/${this.props.userStore.user.username}/${channel.channelname}`}
                  key={i}
                  onClick={() => setTimeout(this.loadChannelFromUrl.bind(this), 10)}
                >
                  <div className="nav-link py-1 pr-1 contacts">
                    <span className="d-inline-block">{channel.channelname}</span>
                    {channel.messageNum > 0 ? <span className="message-number float-right mr-1">
                      <Badge color="danger">{channel.messageNum}</Badge>
                    </span> : <span key={i} className="d-none"> 0</span>}
                  </div>
                </Link>
              )
              : <h6 className="text-secondary pt-1">Create group on the <strong className="plus-text">+</strong></h6>
            }
          </CardBody>
        </Card>
      </Collapse>
    </Nav>

  </div>
  <UpdateSettingModal {...this.updateSettingModalOpen} />
  <AddUserModal {...this.addUserModalOpen} />
  <CreateGroupModal {...this.createGroupModalOpen} />
  <DeleteContactModal {...this.deleteContactModalOpen} />
  <SystemMessagesModal {...this.systemMessagesModalOpen} />
</Fragment >