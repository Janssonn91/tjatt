<Fragment>
  <Modal className="createGroupModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      Create New Group
      <InputGroup  size="sm" className="m-0">
          <Label for="setGroupName" className="mb-1 d-none" >Group Name</Label>
          <Input className="group-name" type="text" name="text" id="setGroupName" placeholder="Group name" onChange={e => this.groupNameChange(e)} />
          <div className={this.myAttr} ><p className="feedback">Oh noes! You forget your group name!</p> </div>
        </InputGroup>
    </ModalHeader>
    <ModalBody>
    <div className="selected-members">
        blablabla
        </div>
    <Form className="m-0">
        <FormGroup className="m-10">
          <Label for="searchContacts" className="d-none" >Find members by searching here:</Label>
          <Input className="search" type="text" name="text" id="searchContacts" placeholder="Find members by searching here:" />
        </FormGroup>
        
      <Row>
        <Col sm="12" lg="6" className="pl-0 right-line">
        
        <FormGroup className="m-0">
        { this.props.loginStore.groupCandidates.map((user, i) =>
        <ListGroupItem key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={()=>this.props.loginStore.selectOneForGroup(user)}>
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
        <Col sm="12" lg="6" className="pr-0">
        <FormGroup className="m-0">
        {this.props.loginStore.selectedGroupMember.map((user, i)=>
         <ListGroupItem key={i} className="nav-link pl-5 pl-md-3 contacts" onClick={()=>this.props.loginStore.removeFromSelect(user)}>
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
              <div className="round d-inline-block">
                <Input type="checkbox" id="checkbox1" />
                <Label check className="m-0" for="checkbox1"/>
              </div>
      </Form>
      <div className={this.showAttr}><p className='feedback'>A group needs at least 3 members!</p></div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={this.props.cancel}>Cancel</Button>&nbsp;
      <Button color="primary" onClick={e=>this.createGroup() }>Create Group</Button>
    </ModalFooter>
  </Modal>
</Fragment>