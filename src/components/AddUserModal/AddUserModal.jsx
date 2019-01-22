<Fragment>
  <Modal className="addUserModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Search for new contacts
    </ModalHeader>
    <ModalBody>
      <Form onSubmit={e => e.preventDefault()}>
        <FormGroup className="m-0">
          <Label for="searchNewContacts" className="mb-1" >Find members by searching here:</Label>
          <Input type="text" name="text" id="searchNewContacts" placeholder="Search" autoComplete="off" onChange={e => this.searchCandidates(e)} />
        </FormGroup>
        <FormGroup className="mt-2 search-result-form-group">
          {this.searchedCandidates.map(user =>
            <ListGroupItem className="p-0 pl-1 " tag="a" href="#" key={user._id}>
              <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} alt="user's photo" />
              <div className="profile d-inline-block">
                <p className="m-0 font-weight-bold">{user.username}</p>
                <p className="text-muted m-0">
                  <small className="font-weight-bold">{user.nickname}</small>
                </p>
              </div>
              <span className="d-inline-block float-right">
                <Button className="btn btn-add-user border-0 d-inline-block float-right" onClick={() => { this.addContact(user._id) }}>Send request</Button>
              </span>
            </ListGroupItem>
          )}
        </FormGroup>
      </Form>
    </ModalBody>
  </Modal>
</Fragment>