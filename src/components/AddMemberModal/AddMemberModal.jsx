<Fragment >
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="add-member-modal">
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle("group")}>
      Add / Delete members: <span className="group-name">{this.props.channelStore.channelName}</span>
    </ModalHeader>
    <ModalBody>
      <Form className="m-0">
      <FormGroup>
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="m-0" type="text" name="text" id="searchContacts" placeholder="Find members by searching here:" />
      </FormGroup>

        <Row className="select-area">
          <Col sm="12" md="6" className="pl-0 pr-1 searched-user ">
            <h5>Searched user</h5>
            <FormGroup className="m-0 overflow-y-auto">
          </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5>Group member</h5>
            <FormGroup className="m-0 pl-1 overflow-y-auto">
          </FormGroup>
          </Col>
        </Row>
      </Form>
      <Alert color="danger" className="text-center">A group needs at least 3 members!</Alert>
    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-save">Save</Button>{' '}
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</Fragment>

