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
        <NavItem>
          <NavLink to="#"><i className="fas fa-star"></i>Stjärnmärkta</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="#">Mina kontakter</NavLink>
        </NavItem>
        <i className="fas fa-plus"></i>

        <NavItem>
          <NavLink to="#">Mina grupper</NavLink>
        </NavItem>
        <i className="fas fa-plus"></i>
    </Nav>
    <hr />
    <Button className="btn-logout mb-5" onClick={e => this.logout()}>Logout</Button>{' '} 
  </div>
</Fragment>