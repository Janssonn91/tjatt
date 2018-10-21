<Fragment>
  <div className="sidebar">
    <div className="profile">
      <div className="user-holder">
        <CardImg src={this.imgPath} />
        <Dropdown isOpen={this.collapseOpen} toggle={e => this.toggle()}>
          <DropdownToggle tag="div" caret>
            <h5>{this.stores.Login.user.nickname || this.stores.Login.user.name}</h5>
            {/* <i className="fas fa-angle-down"></i> */}
          </DropdownToggle >
          <DropdownMenu tag="div">
            <li>
              <label className="btn btn-secondary" htmlFor="files">Välj bild</label>
              <input className="d-none" id="files" type="file" name="files" onChange={this.onFileChange} />
            </li>
            <DropdownItem divider />
            <DropdownItem tag="li">Logga ut</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
    <Button className="btn-logout mb-5" onClick={e => this.logout()}>Logout</Button>{' '}
  </div>
</Fragment >