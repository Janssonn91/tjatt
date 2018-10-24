<Fragment>
  <Modal className="addUserModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Search for new contacts
    </ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup className="m-0">
          <Label for="searchNewContacts" className="mb-1" >Find members by searching here:</Label>
          <Input type="text" name="text" id="searchContacts" placeholder="Search" />
        </FormGroup>
        <ListGroup>
          {toJS(this.filteredUsers).map(user =>
            <ListGroupItem tag="a" href="#" onClick={() => this.addContact(user._id)} key={user._id}>
              <div className="d-inline-block">
                <CardImg className="mr-3" src="/images/placeholder.png" />
              </div>
              <div className="d-inline-block">
                <p className="m-0 font-weight-bold">{user.username}</p>
                <p className="text-muted m-0"><small className="font-weight-bold">{user.nickname}</small></p>
              </div>
            </ListGroupItem>
          )}
        </ListGroup>
      </Form>
    </ModalBody>
  </Modal>
</Fragment>