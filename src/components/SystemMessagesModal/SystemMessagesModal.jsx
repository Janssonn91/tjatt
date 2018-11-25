<Fragment>
  <Modal className="addUserModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
      System messages
    </ModalHeader>
    <ModalBody>
     
      {toJS(this.props.channelStore.unreadSystemMessages).length>0 ?
      
      toJS(this.props.channelStore.unreadSystemMessages).map((message, i)=>
      message.unread ?
        message.textType==="invitation" ?
        <div key={i} className="pr-0">
            <span>{message.initiator} wants to add you as a contact</span>  
            <span>
              <ButtonGroup size="sm">
                <Button>No!</Button>
                <Button>Confirm</Button>
              </ButtonGroup>
            </span>
          </div>
          : message.textType==="decline" ?
          <div key={i*10}>{message.initiator} has rejected your invitation</div>:
          <div key={-i*10}></div>

          
          : 
          <div></div>
      
      )
   
      
          
      
      :<div>No more system messages!</div>
      }

    </ModalBody>
  </Modal>
</Fragment>