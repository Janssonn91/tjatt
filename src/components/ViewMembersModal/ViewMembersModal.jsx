<Fragment>
  <Modal className="viewMembers" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    <ModalHeader tag="h4" toggle={this.props.toggle}>
      View members
    </ModalHeader>
    <ModalBody>
      <ListGroup className="border-0 rounded-0 member-list">
        {this.props.loginStore.candidates.map(user =>
          <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0 admin-user" key={user._id}>
          <CardImg className="mr-3 d-inline-block img" src={"/images/placeholder.png"}/>
          <p className="m-0 p-0 d-inline">Nalle Pu</p>
          <p className="m-0 ml-2 p-0 d-inline admin-text">(Admin)</p>
        </ListGroupItem>
        )}

        {/* <ListGroupItem className="m-0 py-2 px-1 border-left-0 border-right-0 rounded-0">
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
        </ListGroupItem>*/}
      
      </ListGroup>
    </ModalBody>
  </Modal>
</Fragment>