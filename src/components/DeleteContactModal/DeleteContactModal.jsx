<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="leave-group-modal">
  <ModalHeader tag="h4" toggle={this.props.toggle}>Delete contact?</ModalHeader>
  <ModalBody>
    <h6>You are about to delete a contact <strong>"{this.props.channelName}"</strong>, are you sure about this?</h6>
  </ModalBody>
  <ModalFooter>
    <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    <Button className="btn btn-leave-group">Delete</Button>
  </ModalFooter>
</Modal>