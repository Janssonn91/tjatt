<Fragment>
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} className="system-messages-modal">
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
            <span>{message.initiator} wants to add you as a contact.</span> 
            <span>
              <ButtonGroup size="sm" className = "d-inline-block float-right">
                <Button className="btn btn-cancel mr-2" onClick={()=>this.invitationDeclined(message.sender, message.targetChannel, message.id, i)}>Reject</Button>
                <Button className="btn btn-save mr-2" onClick={()=>this.invitationAccepted(message.sender, message.targetChannel, message.id, i)}>Accept</Button>
              </ButtonGroup>
            </span>
          </ListGroupItem>
          : message.textType==="acceptance" ?
          <ListGroupItem key={i}>
          <span>{message.initiator} has accepted your contact invitation.</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          : message.textType==="rejection" ?
          <ListGroupItem key={i}>
          <span>{message.initiator} has rejected your invitation.</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          : message.textType === "addedToGroup" ?
          <ListGroupItem key={i}>
          <span>{message.initiator} has added you as a group member of {message.targetChannel}.</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          : message.textType === "removeFromGroup" ?
          <ListGroupItem key={i}>
          <span>{message.initiator} has removed you from group {message.targetChannel}.</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          : message.textType === "removeContact" ?
          <ListGroupItem key={i}>
          <span>You are no longer contact with {message.initiator}</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          : message.textType === "makeAdmin" ?
          <ListGroupItem key={i}>
          <span>You are now contact of {message.initiator}.</span>
          <span className = "d-inline-block float-right icon" onClick={()=>this.closeSystemMessage(message.id, i)}><i className="far fa-times-circle"></i></span>
          </ListGroupItem>
          :message.textType === "my invitation" ?
          <ListGroupItem key={i}>
          <span>You've invited {message.invitee} as your contact.</span>
          </ListGroupItem>
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