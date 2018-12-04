<Fragment>
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="delete-message-modal">
    <ModalHeader tag="h4" toggle={this.props.toggle}>Delete Message?</ModalHeader>
    <ModalBody>
      <p>Are you sure you want to delete following message:</p>
      {/* <Message/> */}
    </ModalBody>
    <ModalFooter>
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
      <Button className="btn btn-delete-message" onClick={() => { this.props.channelStore.deleteMessage(this.props.selectedMessage); this.props.toggle() }}>Delete Message</Button>
    </ModalFooter>
  </Modal>
</Fragment>