<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder pl-3 pt-4">
        <CardImg src={this.props.loginStore.user.image || imgPath} />
        <Dropdown isOpen={this.collapseOpen} toggle={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5 className="ml-1">{this.props.loginStore.user.nickname || this.props.loginStore.user.username}</h5>
          </DropdownToggle >
          <DropdownMenu tag="div">
            <DropdownItem className="px-3 py-1 btn-li" tag="li" onClick={() => this.openModalupdateSetting()}>Settings</DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="px-3 py-1 btn-li" tag="li" onClick={e => this.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <hr className="mt-0" />
    <Nav vertical className="menu pl-1">
      {/* <NavLink to="#" className="p-0"><i className="fas fa-star pr-3 pr-md-2"></i>
        <NavItem className="pl-1">Starred</NavItem>
      </NavLink> */}

      <div className="flexWrapper">
        <NavLink to="#">
          <NavItem>My Contacts</NavItem>
        </NavLink>
        <i onClick={this.openModalAddNewUser.bind(this)} className="fas fa-plus float-left float-md-none pl-4 pr-1 pl-md-0"></i>
      </div>
      <div id="contactsRender"></div>
      {/* {this.props.loginStore.myContacts.map((user, i) =>
        <div key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={() => this.props.channelStore.changeChannel("contact", user._id)}>
          <CardImg className="mr-3 d-inline-block" src={user.image || "/images/placeholder.png"} />
          <div className="d-inline-block">{user.nickname}</div>
        </div>
      )} */}
      <div className="flexWrapper">
        <NavLink to="#">
          <NavItem>My Groups</NavItem>
        </NavLink>
        <i onClick={this.openModalCreateGroup.bind(this)} className="fas fa-plus float-left float-md-none pl-4 pr-1 pl-md-0"></i>
      </div>
      <div id="groupsRender"></div>
      {/* {this.props.channelStore.myChannels.map((channel, i) => 
      <NavLink key={i} className="nav-link pl-5 pl-md-3 contacts">

       <div className="d-inline-block" >{channel}</div>
       </NavLink>
      )} */}
    </Nav>
    <hr />
  </div>
  <UpdateSettingModal {...this.updateSettingModalOpen} />
  <AddUserModal {...this.addUserModalOpen} />
  <CreateGroupModal {...this.createGroupModalOpen} />
</Fragment >