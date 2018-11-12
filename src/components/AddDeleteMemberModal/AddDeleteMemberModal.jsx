<Fragment >
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="add-member-modal">
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle("group")}>
      Add/Delete members: <span className="group-name">{this.props.channelStore.channelName}</span>
    </ModalHeader>
    <ModalBody>
      <Form className="m-0">
        <FormGroup>
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="m-0" type="text" name="text" id="searchContacts" autoComplete="off" placeholder="Find members by searching here:" />
        </FormGroup>

        <Row className="select-area">
          <Col sm="12" md="6" className="pl-0 pr-1 searched-user ">
            <h5>Searched user</h5>
            <FormGroup className="m-0 overflow-y-auto">
              {this.props.channelStore.currentGroupCandidates.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1 contacts">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile searched-user-big-screen-profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block float-right">
                    <Button className="btn btn-add-user border-0 d-inline-block float-right" onClick={() => this.props.channelStore.selectOneForGroup(user)}>Add user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5>Group member</h5>
            <FormGroup className="m-0 pl-1 overflow-y-auto">
              {this.props.channelStore.currentGroupMembers.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block float-right">
                    <Button className="btn btn-remove-user border-0 p-0 mr-2 d-inline-block float-right" onClick={() => this.props.channelStore.removeFromSelect(user)}>Remove user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {this.error && < Alert className="text-center alert" color="danger">A group needs at least 3 members!</Alert>}
      {this.showConfirmation && < Alert className="text-center alert" color="warning">Really ok to change your group?</Alert>}
    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
      <Button className="btn btn-save" onClick={() => this.updateGroup()}>Save</Button>
    </ModalFooter>
  </Modal>
</Fragment>

