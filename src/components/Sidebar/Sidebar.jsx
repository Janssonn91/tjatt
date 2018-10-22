<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder px-3 pt-3 pb-2">
        <CardImg src="/images/placeholder.png" />
        <UncontrolledDropdown onClick={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5>{this.stores.Login.user.nickname || this.stores.Login.user.name}</h5>
          </DropdownToggle >
          <DropdownMenu tag="ul" className="p-0">
            <DropdownItem tag="li">
              <input type="text"></input>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag="li" onClick={e => this.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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
</Fragment>