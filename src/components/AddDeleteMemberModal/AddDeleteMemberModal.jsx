<Fragment >
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="add-member-modal">
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle("group")}>
      Add/Delete members: <span className="group-name">{this.props.channelStore.channelName}</span>
    </ModalHeader>
    <ModalBody>
        <div className="selected-members d-md-none d-inline-block">
          <span className="note d-inline-block"><i className="fas fa-circle admin note"></i>Admin</span>
          <ScrollableFeed forceScroll={true}>
          {this.groupMembers.map((user, i) =>
              <div key={i} className="nav-link pl-0 d-inline-block">
                <div className="wrapper d-block">
                  {user._id !== this.props.userStore.user._id &&
                    !this.props.channelStore.currentChannelAdmins.includes(user._id) &&
                  <i className="fas fa-times-circle icon" onClick={() => this.removeFromSelect(user)}></i>
                  }
                  {this.props.channelStore.currentChannelAdmins.includes(user._id) && <i className="fas fa-circle admin"></i>}
                  <CardImg className="mr-3 img" src={user.image || "/images/placeholder.png"} />
                </div>
                <div className="profile">
                  <p className="text-muted m-0">
                    <small className="font-weight-bold">{user.nickname}</small>
                  </p>
                </div>
                <div
                  ref={(el) => {
                    this.selectedMemberEnd = el;
                  }}>
                </div>
              </div>
            )}
          </ScrollableFeed>
        </div>
      <Form className="m-0">
        <FormGroup>
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="m-0" type="text" name="text" id="searchContacts" autoComplete="off" placeholder="Find members by searching here:" onChange={e => this.searchCandidates(e)} />
        </FormGroup>

        <Row className="select-area">
          <Col sm="12" md="6" className="pl-0 pr-1 searched-user ">
            <h5>Searched user</h5>
            <p className="group-modal-text">View all users <input type="checkbox" onChange={this.checkboxHandler}></input></p>
            <FormGroup className="m-0 overflow-y-auto">
              {this.searchedGroupCandidates.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1 contacts">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile searched-user-big-screen-profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <Button className="btn btn-add-user border-0" onClick={() => this.selectOneForGroup(user)}>Add user</Button>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5 className="d-inline-block">Group member</h5>
            <span className="note d-inline-block"><i className="fas fa-circle admin note"></i>Admin</span>
            <FormGroup className="m-0 pl-1 overflow-y-auto">
              {this.groupMembers.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  {user._id !== this.props.userStore.user._id &&
                    !this.props.channelStore.currentChannelAdmins.includes(user._id) &&
                    <Button
                      className="btn btn-remove-user border-0 p-0 mr-2"
                      onClick={() => this.removeFromSelect(user)}
                    >Remove user</Button>
                  }
                  {this.props.channelStore.currentChannelAdmins.includes(user._id) && <i className="fas fa-circle admin"></i>}
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {this.showConfirmation && < Alert className="text-center alert" color="warning">Really ok to change your group?</Alert>}
      {this.addedSuccess &&
        this.removedSuccess &&
        < Alert className="text-center alert" color="success">Saved successfully!</Alert>
      }
    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
      <Button className="btn btn-save" onClick={() => this.updateGroup()}>Save</Button>
    </ModalFooter>
  </Modal>
</Fragment>

