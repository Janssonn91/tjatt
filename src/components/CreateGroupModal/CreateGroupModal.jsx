<Fragment>
  <Modal className="createGroupModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle("group")}>
      Create New Group
      <InputGroup size="sm" className="m-0">
        <Label for="setGroupName" className="mb-1 d-none">Group Name</Label>
        <Input className="group-name mt-2" type="text" name="text" id="setGroupName" placeholder="Group name" onChange={e => this.groupNameChange(e)} />
        <div className={this.myAttr} >
          <p className="feedback">Oh noes! You forget your group name!</p>
        </div>
      </InputGroup>
    </ModalHeader>
    <ModalBody>
      {this.props.loginStore.selectedGroupMember.length > 0 ?
        <div className="selected-members d-md-none d-inline-block">
          <ScrollableFeed forceScroll={true}>
            {this.props.loginStore.selectedGroupMember.map((user, i) =>
              <span key={i} className="nav-link pl-0 pt-0 d-inline-block" onClick={() => this.props.loginStore.removeFromSelect(user)}>
                <CardImg className="mr-3 img" src={user.image || "/images/placeholder.png"} />
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
              </span>
            )}
          </ScrollableFeed>
        </div>
        :
        <Fragment></Fragment>
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
              {this.props.loginStore.groupCandidates.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1 contacts">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile searched-user-big-screen-profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block float-right">
                    <Button className="btn btn-add-user border-0 d-inline-block float-right" onClick={() => this.props.loginStore.selectOneForGroup(user)}>Add user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block">
            <h5>Added user</h5>
            <FormGroup className="m-0 pl-1 overflow-y-auto">
              {this.props.loginStore.selectedGroupMember.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1">
                  <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small>{user.nickname}</small>
                    </p>
                  </div>
                  <span className="d-inline-block float-right">
                    <Button className="btn btn-remove-user border-0 p-0 mr-2 d-inline-block float-right" onClick={() => this.props.loginStore.removeFromSelect(user)}>Remove user</Button>
                  </span>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div className={this.showAttr}><p className='feedback'>A group needs at least 3 members!</p></div>
    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-cancel" onClick={e => this.props.toggle("group")}>Cancel</Button>&nbsp;
      <Button className="btn btn-create" onClick={e => this.createGroup()}>Create Group</Button>
    </ModalFooter>
  </Modal>
</Fragment>