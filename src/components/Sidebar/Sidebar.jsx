<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder">
        <CardImg src="/images/placeholder.png" />
        <UncontrolledDropdown onClick={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5>{this.stores.Login.user.nickname || this.stores.Login.user.name}</h5>
            {/* <i className="fas fa-angle-down"></i> */}
          </DropdownToggle >
          <DropdownMenu tag="ul">
            <DropdownItem tag="li">
              <input type="text"></input>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag="li" onClick={e => this.logout()}>Logga ut</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
    <hr />
    <Nav vertical className="menu">
      <NavLink to="#"><i className="fas fa-star"></i>
        <NavItem>Stjärnmärkta</NavItem>
      </NavLink>

      <NavLink to="#">
        <NavItem>Mina kontakter</NavItem>
      </NavLink>
      <i className="fas fa-plus"></i>

      <NavLink to="#">
        <NavItem>Mina grupper</NavItem>
      </NavLink>
      <i className="fas fa-plus"></i>
    </Nav>
    <hr />
    <Button className="btn-showChat mb-5" onClick={this.props.toMenu}>Show Chat</Button>{' '}
  </div>
</Fragment>