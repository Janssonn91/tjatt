<Fragment>
<Col className="chat-about">
  <div className="chat-with">Chat with channel name that is very long for testing purposes</div>
    {/* change icon if channel is group or not */}
    {/* <Col sm="1" className="dialog-icon">
    <FontAwesomeIcon icon="user" />
    </Col> */}
    <div className="dialog-icon">
      <Dropdown isOpen={this.dropdownOpen} toggle={e=>this.dropdownToggle()}>
        <DropdownToggle tag="span" onClick={e=>this.dropdownToggle()} data-toggle="dropdown" aria-expanded={this.dropdownOpen}>
          <div className="d-inline-block">
            <h6 className="d-inline-block mr-2">Grupphantering</h6><FontAwesomeIcon icon="users" />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Group Name</DropdownItem>
          <DropdownItem>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </Col>
</Fragment>