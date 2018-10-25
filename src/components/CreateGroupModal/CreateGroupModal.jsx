<Fragment>
  <Modal className="createGroupModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Create New Group
    </ModalHeader>
    <ModalBody>
      <Form className="m-0">
        <FormGroup className="m-0">
          <Label for="searchContacts" className="mb-1" >Find members by searching here:</Label>
          <Input className="search" type="text" name="text" id="searchContacts" placeholder="Search" />
        </FormGroup>
        <FormGroup className="m-0">
          <ListGroupItem>
            <div className="img-holder d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="profile w-50 d-inline-block">
              <p className="m-0 font-weight-bold">Username that is long</p>
              <p className="text-muted m-0">
                <small className="font-weight-bold">Long nickname</small>
              </p>
            </div>
            <div className="round d-inline-block">
              <Input type="checkbox" id="checkbox" />
              <Label className="m-0" for="checkbox"/>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="img-holder d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="profile w-50 d-inline-block">
              <p className="m-0 font-weight-bold">Username</p>
              <p className="text-muted m-0">
                <small className="font-weight-bold">Nickname</small>
              </p>
            </div>
            <div className="round d-inline-block">
              <Input type="checkbox" id="checkbox" />
              <Label className="m-0" for="checkbox"/>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="img-holder d-inline-block">
              <CardImg className="mr-3" src="/images/placeholder.png" />
            </div>
            <div className="profile w-50 d-inline-block">
              <p className="m-0 font-weight-bold">Username that is longer</p>
              <p className="text-muted m-0">
                <small className="font-weight-bold">Longer Nickname</small>
              </p>
            </div>
            <div className="round d-inline-block">
              <Input type="checkbox" id="checkbox" />
              <Label className="m-0" for="checkbox"/>
            </div>
          </ListGroupItem>
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={this.props.cancel}>Cancel</Button>&nbsp;
      <Button color="primary" onClick={this.props.ok }>Create Group</Button>
    </ModalFooter>
  </Modal>
</Fragment>