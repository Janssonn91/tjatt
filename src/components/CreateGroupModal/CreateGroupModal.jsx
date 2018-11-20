<Fragment>
  <Modal className="createGroupModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Create New Group
      <InputGroup size="sm" className="m-0">
        <Label for="setGroupName" className="mb-1 d-none">Group Name</Label>
        <Input className="group-name mt-2" type="text" name="text" id="setGroupName" autoComplete="off" placeholder="Group name" onChange={e => this.groupNameChange(e)} />
        <div className={this.myAttr} >
          <p className="feedback ml-1">Oh noes! You forget your group name!</p>
        </div>
      </InputGroup>
    </ModalHeader>
    <ModalBody>
      {this.props.userStore.selectedGroupMember.length > 0 &&
        <div className="selected-members d-md-none d-inline-block">
          <ScrollableFeed forceScroll={true}>
            {this.props.userStore.selectedGroupMember.map((user, i) =>
              <div key={i} className="nav-link pl-0 d-inline-block">
                <div className="wrapper d-block">
                  <i className="fas fa-times-circle icon" onClick={() => this.props.userStore.removeFromSelect(user)}></i>
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
      }

      <Form className="m-0" onSubmit={e => e.preventDefault()}>
        <FormGroup>
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="m-0" type="text" name="text" id="searchContacts" placeholder="Find members by searching here:"
            onChange={e => this.searchContacts(e)} autoComplete="off" />
        </FormGroup>

        <Row className="select-area">
          <Col sm="12" md="6" className="pl-0 pr-1 searched-user ">
            <h5 className="group-modal-text">Searched users</h5>
            <p className="group-modal-text">View all users <input type="checkbox" onChange={this.checkboxHandler}></input></p>
            <FormGroup className="m-0 overflow-y-auto">
              {this.searchContact.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1 contacts">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile searched-user-big-screen-profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block ml-auto">
                    <Button className="btn btn-add-user border-0 d-inline-block ml-auto" onClick={() => { this.props.userStore.selectOneForGroup(user); this.removeFromSearchedUsers(user) }}>Add user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5>Added users</h5>
            <FormGroup className="m-0 pl-1 overflow-y-auto">
              {this.props.userStore.selectedGroupMember.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block float-right">
                    <Button className="btn btn-remove-user border-0 p-0 mr-2 d-inline-block float-right" onClick={() => { this.props.userStore.removeFromSelect(user); this.removeFromSelectedUser(user) }}>Remove user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {this.error && < Alert className="text-center alert" color="danger">A group needs at least 3 members!</Alert>}
    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-cancel" onClick={e => this.props.toggle()}>Cancel</Button>&nbsp;
      <Button className="btn btn-create" onClick={e => this.createGroup(e)}>Create Group</Button>
    </ModalFooter>
  </Modal>
</Fragment>