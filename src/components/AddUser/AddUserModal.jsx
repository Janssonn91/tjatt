<Fragment>
  <Modal className="addUserModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Search for new contacts
    </ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup className="m-0">
          <Label for="searchNewContacts" className="mb-1" >Find members by searching here</Label>
          <Input type="text" name="text" id="searchContacts" placeholder="Search" />
        </FormGroup>
        <ListGroup>
        <ListGroupItem tag="a" href="#">
            <div className="d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="d-inline-block">
              <p className="m-0 font-weight-bold">Username Here</p>
              <p className="text-muted m-0"><small className="font-weight-bold">Nickname</small></p>
            </div>
          </ListGroupItem>

          <ListGroupItem tag="a" href="#">
            <div className="d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="d-inline-block">
              <p className="m-0 font-weight-bold">Username Here</p>
              <p className="text-muted m-0"><small className="font-weight-bold">Nickname</small></p>
            </div>
          </ListGroupItem>
          
          <ListGroupItem tag="a" href="#">
            <div className="d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="d-inline-block">
              <p className="m-0 font-weight-bold">Username Here</p>
              <p className="text-muted m-0"><small className="font-weight-bold">Nickname</small></p>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Form>
    </ModalBody>
  </Modal>
</Fragment>