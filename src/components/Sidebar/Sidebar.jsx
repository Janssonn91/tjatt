<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder">
        <CardImg src="/images/placeholder.png"/>
        <UncontrolledDropdown onClick={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5>Användarnamn</h5>
            <i className="fas fa-angle-down"></i>
          </DropdownToggle >
          <DropdownMenu tag="ul">
            <DropdownItem tag="li">Byta bild</DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag="li">Logga ut</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
    <hr />
    <Nav vertical className="menu">
      <div>
        <NavItem>
          <NavLink to="#"><i className="fas fa-star"></i>Stjärnmärkta</NavLink>
        </NavItem>
      </div>
      <div>
        <NavItem>
          <NavLink to="#">Mina kontakter</NavLink>
        </NavItem>
        <i className="fas fa-plus"></i>
      </div>
      <div>
        <NavItem>
          <NavLink to="#">Mina grupper</NavLink>
        </NavItem>
        <i className="fas fa-plus"></i>
      </div>
    </Nav>
    <hr />
  </div>
</Fragment>