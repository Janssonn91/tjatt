<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder pl-3 pt-4">
        <CardImg src={this.useDBPath ? this.props.loginStore.user.image : this.imgPath} />
        <Dropdown isOpen={this.collapseOpen} toggle={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5 className="ml-1">{this.props.loginStore.user.nickname || this.props.loginStore.user.username}</h5>
          </DropdownToggle >
          <DropdownMenu tag="div">
            <li className="px-3 py-1 btn-li">
              <label className="btn btn-upload m-0 p-0" htmlFor="files">Choose image</label>
              <input className="d-none" id="files" type="file" name="files" onChange={this.onFileChange} />
            </li>
            <DropdownItem divider />
            <DropdownItem className="px-3 py-1" tag="li" onClick={e => this.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button className="btn-showChat float-right" onClick={this.props.toMenu}>Show Chat</Button>{' '}
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
      {this.props.loginStore.myContacts.map((user, i) =>
        <NavLink key={i} className="nav-link pl-5 pl-md-3">
          <CardImg className="mr-3 d-inline-block" src={user.image || "/images/placeholder.png"} />
          <div className="d-inline-block">{user.username}</div>
        </NavLink>
      )}
      <div className="flexWrapper">
        <NavLink to="#">
          <NavItem>My Groups</NavItem>
        </NavLink>
        <i onClick={this.openModalCreateGroup.bind(this)} className="fas fa-plus float-left float-md-none pl-4 pr-1 pl-md-0"></i>
      </div>
    </Nav>
    <hr />
  </div>
  <AddUserModal {...this.addUserModalOpen} />
  <CreateGroupModal {...this.createGroupModalOpen} />
</Fragment >