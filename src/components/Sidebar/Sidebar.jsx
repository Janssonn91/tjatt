<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder px-3 py-3">
        <CardImg src={this.imgPath} />
        <Dropdown isOpen={this.collapseOpen} toggle={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5>{this.stores.Login.user.nickname || this.stores.Login.user.username}</h5>
          </DropdownToggle >
          <DropdownMenu tag="div">
            <li>
              <label className="btn btn-secondary" htmlFor="files">Välj bild</label>
              <input className="d-none" id="files" type="file" name="files" onChange={this.onFileChange} />
            </li>
            <DropdownItem divider />
            <DropdownItem tag="li" onClick={e => this.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button className="btn-showChat float-right" onClick={this.props.toMenu}>Show Chat</Button>{' '}
      </div>
    </div>
    <hr />
    <Nav vertical className="menu">
      <NavLink to="#" className="p-0"><i className="fas fa-star pl-4 pr-2"></i>
        <NavItem className="pl-1">Starred</NavItem>
      </NavLink>

      <NavLink to="#">
        <NavItem>My Contacts</NavItem>
      </NavLink>
      <i className="fas fa-plus float-left float-md-none pl-4 pr-1 pl-md-0"></i>

      <NavLink to="#">
        <NavItem>My Groups</NavItem>
      </NavLink>
      <i className="fas fa-plus float-left float-md-none pl-4 pr-1 pl-md-0"></i>
    </Nav>
    <hr />
  </div>
</Fragment >