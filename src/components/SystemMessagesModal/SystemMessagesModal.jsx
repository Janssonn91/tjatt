<Fragment>
  <Modal className="addUserModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      System messages
    </ModalHeader>
    <ModalBody>
     
      {toJS(this.props.channelStore.unreadSystemMessages).length>0 ?
      
      toJS(this.props.channelStore.unreadSystemMessages).map((message, i)=>
      <ListGroup key = {i}>
      {message.unread ?
        message.textType==="invitation" ?
        <ListGroupItem key={i} className="pr-0">
            <span>{message.initiator} wants to add you as a contact</span>   
            <span>
              <ButtonGroup size="sm">
                <Button onClick={()=>this.invitationDeclined(message.id, i)}>Decline</Button>
                <Button>Confirm</Button>
              </ButtonGroup>
            </span>
          </ListGroupItem>
          : message.textType==="decline" ?
          <ListGroupItem key={i}>
          <span>{message.initiator} has rejected your invitation</span>
          <span><Button size="sm">x</Button></span>
          </ListGroupItem>
          : message.textType === "addedToGroup" ?
          <ListGroupItem key={i}>{message.initiator} has added you as a group member of {message.targetChannel}</ListGroupItem>
          : message.textTyep === "removedFromGroup" ?
          <ListGroupItem key={i}>{message.initiator} has removed you from group {message.targetChannel}</ListGroupItem>
          : message.textType === "removeContact" ?
          <ListGroupItem key={i}>You are nolonger contact with {message.initiator}</ListGroupItem>
          : message.textType === "makeAdmin" ?
          <ListGroupItem key={i}>You are now admin of {message.targetChannel}</ListGroupItem>
          :
          <div key={i}></div>
          : 
          <div></div>}
         </ListGroup> 
      
      )
   
      
          
      
      :<div>No more system messages!</div>
      }

    </ModalBody>
  </Modal>
</Fragment>