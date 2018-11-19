<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder pl-3 pt-4">
        <CardImg src={this.props.userStore.user.image || imgPath} />
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
      {/* <NavLink to="#" className="p-0"><i className="fas fa-star pr-3 pr-md-2"></i>
        <NavItem className="pl-1">Starred</NavItem>
      </NavLink> */}


      <NavLink className="pt-0 pr-0">
        <NavItem onClick={this.openContacts}>My Contacts {!this.contactsOpen ? <i className="fas fa-sort-down arrow-down"></i> : <i className="fas fa-sort-up arrow-up"></i>}</NavItem>
      </NavLink>
      <i onClick={this.openModalAddNewUser.bind(this)} className="fas fa-plus"></i>
      <Collapse className="pl-2" isOpen={this.contactsOpen}>
        <Card className="contactsCollapse border-0 m-0">
          <CardBody className="p-0">
            {this.props.userStore.myContacts.length > 0 ?
              <div id="contactsRender"></div>
              : <h6 className="text-secondary pl-3 pt-1">Add a contact on the  <strong>+</strong></h6>
            }
            {/* {<div id="contactsRender"></div> */}
            {this.props.channelStore.contactChannels.map((channel, i) =>
              <React.Fragment key={i}>
                <Link to={`/${this.props.userStore.user.username}/${channel.channelname}`} onClick={() => this.changeChannel(channel)}>
                  <div  className="nav-link pl-5 pl-md-3 contacts">
                    <CardImg className="mr-3 d-inline-block" src={channel.image || "/images/placeholder.png"} />
                    <span className="d-inline-block">{channel.channelname}</span>
                    {channel.messageNum>0 ? <span  className="message-number">
                <Badge color="danger">{channel.messageNum}</Badge>
                </span> :  <span key={i} className="d-none"></span>}
                  </div>
                  
                  
                </Link>
                {/* <Route exact path={`/${this.props.loginStore.user.username}/:id`} component={Tjatt} /> */}
              </React.Fragment>
            )}
            {/* {this.props.loginStore.myContacts.map((user, i) =>
              <div key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={() => this.changeChannel(user._id, user.nickname)}>
                <CardImg className="mr-3 d-inline-block" src={user.image || "/images/placeholder.png"} />
                <div className="d-inline-block">{user.nickname}</div>
              </div>
            )} */}
          </CardBody>
        </Card>
      </Collapse>
      <NavLink className="pr-0">
        <NavItem onClick={this.openGroups}>My Groups {!this.groupsOpen ? <i className="fas fa-sort-down arrow-down"></i> : <i className="fas fa-sort-up arrow-up"></i>}</NavItem>
      </NavLink>
      <i onClick={this.openModalCreateGroup.bind(this)} className="fas fa-plus"></i>
      <Collapse className="pl-2" isOpen={this.groupsOpen}>
        <Card className="groupCollapse border-0 m-0">
          <CardBody className="p-0">
            {this.props.channelStore.groupChannels.length > 0 ?
              this.props.channelStore.groupChannels.map((channel, i) =>
              <React.Fragment key={i}>
                <div  className="nav-link pl-5 pl-md-3 contacts" onClick={() => this.changeChannel(channel)}>
                  <span className="d-inline-block">{channel.channelname}</span>
                  {channel.messageNum>0 ? <span  className="message-number">
                <Badge color="danger">{channel.messageNum}</Badge>
                </span> :  <span key={i} className="d-none"> 0</span>}
                </div>
                
                </React.Fragment>
              )
              : <h6 className="text-secondary pl-3 pt-1">Create new group on the  <strong>+</strong></h6>
            }
            {/* <div id="groupsRender"></div> */}
           
          </CardBody>
        </Card>
      </Collapse>


      {/* {this.props.channelStore.myChannels.map((channel, i) =>
      <NavLink key={i} className="nav-link pl-5 pl-md-3 contacts">

       <div className="d-inline-block" >{channel}</div>
       </NavLink>
      )} */}
    </Nav>

  </div>
  <UpdateSettingModal {...this.updateSettingModalOpen} />
  <AddUserModal {...this.addUserModalOpen} />
  <CreateGroupModal {...this.createGroupModalOpen} />
</Fragment >