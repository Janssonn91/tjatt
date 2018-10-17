<Fragment>
  <Col md={{size: 3}} className="sidebar">
    <div className="profile">
      <div className="user-holder">
        <CardImg src="/images/placeholder.png"/>
        <h6>Användarnamn</h6>
        <i class="fas fa-angle-down"></i>
      </div>
    </div>
    <hr />
    <Nav vertical className="menu">
      <NavItem>
        <NavLink to="#"><i class="fas fa-star"></i>Stjärnmärkta</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="#">Disabled Link</NavLink>
      </NavItem>
    </Nav>
    <hr />
  </Col>
</Fragment>