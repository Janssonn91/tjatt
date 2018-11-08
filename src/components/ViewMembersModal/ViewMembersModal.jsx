<Fragment>
  <Modal className="viewMembers" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    <ModalHeader tag="h4" toggle={this.props.toggle}>
      View members
    </ModalHeader>
    <ModalBody>
      <ListGroup className="border-0 rounded-0 member-list">
      {/*<FormGroup className="m-0 pl-1 overflow-y-auto">*/}
              {/*{this.props.channelStore.currentGroupMembers.map((user, i) =>
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
              )}*/}

      {this.props.channelStore.currentGroupMembers.map((user, i) =>
        <ListGroupItem key={i} className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0 admin-user">
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">{user.nickname}</p>
           {/*{<p className="m-0 p-0 d-inline">{user._id}</p>}*/}
          {this.channelAdmins.map((id, ind) =>
             
              <p key={ind} className="m-0 ml-2 p-0 d-inline admin-text">{id === user._id ? '(Admin)' : ''}</p>
              
          )}
          <p className="text-muted m-0"><small>{user.username} hej</small></p>
          <Button className="btn btn-make-admin border-0 float-right">Make admin</Button>
        </ListGroupItem>
      )}
      <Button onClick={e => {this.testbtn(e)}}>Test</Button>
{/*}     
        <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0">
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">Nasse</p>
          <Button className="btn btn-make-admin border-0 float-right">Make admin</Button>
        </ListGroupItem>

        <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0">
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">Tiger</p>
          <Button className="btn btn-make-admin border-0 float-right">Make admin</Button>
        </ListGroupItem>

        <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0">
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">Åsnan</p>
          <Button className="btn btn-make-admin border-0 float-right">Make admin</Button>
        </ListGroupItem>

        <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0">
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">Kristoffer Robin</p>
          <Button className="btn btn-make-admin border-0 float-right">Make admin</Button>
        </ListGroupItem>
    */}
      </ListGroup>
    </ModalBody>
  </Modal>
</Fragment>