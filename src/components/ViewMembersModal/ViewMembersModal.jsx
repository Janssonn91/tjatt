<Fragment>
  <Modal className="viewMembers" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    <ModalHeader tag="h4" toggle={this.props.toggle}>
      View members
    </ModalHeader>
    <ModalBody>
      <ListGroup className="border-0 rounded-0 member-list">    
      {this.props.channelStore.currentGroupMembers.map((user, i) =>
        <ListGroupItem key={i} className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0 admin-user">
          <CardImg className="mr-3 d-inline-block img" src={user.image || "/images/placeholder.png"}/>
          <p className="m-0 p-0">Username: {user.username}</p>
          <p className="m-0 p-0">Nickname: {user.nickname}</p>
          {this.props.channelStore.currentChannel.admin.includes(user._id) &&
            <p className="m-0 ml-2 p-0 d-inline admin-text">(Admin)</p>
          }
          {!this.props.channelStore.currentChannel.admin.includes(user._id) || this.props.channelStore.amIAdmin &&
          <Button className="btn btn-make-admin border-0 float-right" onClick={e => this.setNewAdmin(e, user._id)}>Make admin</Button>
          }
        </ListGroupItem>
      )}
      </ListGroup>
    </ModalBody>
  </Modal>
</Fragment>

