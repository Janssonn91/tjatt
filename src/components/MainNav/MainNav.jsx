<div>
  <Navbar color="light" light expand="md">
    <NavbarBrand to="/">
      <img alt="React" className="logo" src={logo} />
      React Warp Core
    </NavbarBrand>
    <NavbarToggler onClick={e => this.toggle()} />
    <Collapse isOpen={this.isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink exact to="/" activeClassName = "active">Welcome!</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/clock" activeClassName = "active">Clock</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login" activeClassName = "active">Login</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>