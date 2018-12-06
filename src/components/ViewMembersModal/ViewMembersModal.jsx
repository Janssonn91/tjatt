<Fragment>
  <Modal className="viewMembers" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    <ModalHeader tag="h4" toggle={this.props.toggle}>
      View members
    </ModalHeader>
    <ModalBody>
      {this.props.channelStore.currentChannelAdmins.includes(this.props.userStore.user._id) && this.props.channelStore.currentChannelAdmins.length < 2 && this.props.channelStore.adminLeavingError &&
        <Alert color="danger" className="my-2 text-center">
          You are the only admin in the group, please make another member admin before leaving
      </Alert>}
      <ListGroup className="border-0 rounded-0 member-list">
        {this.props.channelStore.currentGroupMembers.map((user, i) =>
          <ListGroupItem key={i} className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0 admin-user">
            <CardImg className="mr-2 d-inline-block img" src={user.image || "/images/placeholder.png"} alt="user's photo" />
            <div className="profile d-inline-block">
              <p className="m-0 font-weight-bold">{user.username}</p>
              <p className="text-muted m-0">
                <small>{user.nickname}</small>
              </p>
            </div>
            {this.props.channelStore.currentChannelAdmins.includes(user._id) &&
              <p className="m-0 p-0 d-inline float-right admin-text">(Admin)</p>
            }
            {!this.props.channelStore.currentChannelAdmins.includes(user._id) && this.props.channelStore.currentChannelAdmins.includes(this.props.userStore.user._id) &&
              <Button className="btn btn-make-admin border-0 float-right" onClick={e => this.setNewAdmin(e, user._id)}>Make admin</Button>
            }
          </ListGroupItem>
        )}
      </ListGroup>
    </ModalBody>
  </Modal>
</Fragment>

