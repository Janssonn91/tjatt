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
              <span key={i} className="nav-link pl-0 d-inline-block" onClick={() => this.props.loginStore.removeFromSelect(user)}>
                <CardImg className="mr-3 img" src={user.image || "/images/placeholder.png"} />
                <div className="profile w-50 ">
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
        <FormGroup className="m-10">
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="mb-1" type="text" name="text" id="searchContacts" placeholder="Find members by searching here:" />
        </FormGroup>

        <Row className="select-area">
          <Col sm="12" md="6" className="pl-0 pr-1 searched-user overflow-y-auto">

            <FormGroup className="m-0">
              {this.props.loginStore.groupCandidates.map((user, i) =>
                <ListGroup key={i}>
                  <ListGroupItem className="nav-link p-0 pl-1 contacts" onClick={() => this.props.loginStore.selectOneForGroup(user)}>
                    <CardImg className="mr-3 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                    <div className="profile d-inline-block">
                      <p className="m-0 font-weight-bold">{user.username}</p>
                      <p className="text-muted m-0">
                        <small className="font-weight-bold">{user.nickname}</small>
                      </p>
                    </div>
                  </ListGroupItem>
                  </ListGroup>
              )}
                
            </FormGroup>

          </Col>
          <Col sm="12" md="6" className="pl-0 pr-1 big-screen d-none d-md-block overflow-y-auto">
            <FormGroup className="m-0 pl-1">
              {this.props.loginStore.selectedGroupMember.map((user, i) =>
                <ListGroupItem key={i} className="nav-link p-0 pl-1" onClick={() => this.props.loginStore.removeFromSelect(user)}>
                  <CardImg className="mr-3 d-inline-block img" src={user.image || "/images/placeholder.png"} />
                  <div className="profile w-50 d-inline-block">
                    <p className="m-0 font-weight-bold">{user.username}</p>
                    <p className="text-muted m-0">
                      <small className="font-weight-bold">{user.nickname}</small>
                    </p>
                  </div>
                </ListGroupItem>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div className={this.showAttr}><p className='feedback'>A group needs at least 3 members!</p></div>
    </ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={e => this.props.toggle("group")}>Cancel</Button>&nbsp;
      <Button color="success" onClick={e => this.createGroup()}>Create Group</Button>
    </ModalFooter>
  </Modal>
</Fragment>