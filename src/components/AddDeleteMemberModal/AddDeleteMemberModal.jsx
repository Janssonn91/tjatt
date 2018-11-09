<Fragment >
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="add-member-modal">
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle("group")}>
      Add / Delete members: <span className="group-name">{this.props.channelStore.channelName}</span>
    </ModalHeader>
    <ModalBody>
      {this.props.channelStore.currentGroupMembers.length > 0 &&
        <div className="selected-members d-md-none d-inline-block">
          <ScrollableFeed forceScroll={true}>
            {this.props.channelStore.currentGroupMembers.map((user, i) =>
              <div key={i} className="nav-link pl-0 d-inline-block" onClick={() => this.props.loginStore.removeFromSelect(user)}>
                <div className="wrapper d-block">
                  {user._id !== this.props.loginStore.user._id &&
                    user._id !== this.props.channelStore.groupAdminId &&
                    <i className="fas fa-times-circle icon" onClick={() => this.props.channelStore.removeFromSelect(user)}></i>
                  }
                  {user._id === this.props.channelStore.groupAdminId && <i className="fas fa-circle admin"></i>}
                  <CardImg className="mr-3 img" src={user.image || "/images/placeholder.png"} />
                </div>
                <div className="profile">
                  <p className="text-muted m-0">
                    <small className="font-weight-bold">{user.nickname}</small>
                  </p>
                </div>
                <div style={{
                  float: "left",
                  clear: "both"
                }}
                  ref={(el) => {
                    this.selectedMemberEnd = el;
                  }}>
                </div>
              </div>
            )}
          </ScrollableFeed>
        </div>
      }

      <Form className="m-0">
        <FormGroup>
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="m-0" type="text" name="text" id="searchContacts" placeholder="Find members by searching here:" />
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
                  <Button className="btn btn-add-user border-0" onClick={() => this.props.channelStore.selectOneForGroup(user)}>Add user</Button>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5 className="d-inline-block">Group member</h5>
            <span className="note d-inline-block"><i className="fas fa-circle admin note"></i>Admin</span>
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
                  {user._id !== this.props.loginStore.user._id &&
                    user._id !== this.props.channelStore.groupAdminId &&
                    <Button
                      className="btn btn-remove-user border-0 p-0 mr-2"
                      onClick={() => this.props.channelStore.removeFromSelect(user)}
                    >Remove user</Button>
                  }
                  {user._id === this.props.channelStore.groupAdminId && <i className="fas fa-circle admin"></i>}
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
      <Button className="btn btn-save" onClick={() => this.updateGroup()}>Save</Button>{' '}
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</Fragment>

