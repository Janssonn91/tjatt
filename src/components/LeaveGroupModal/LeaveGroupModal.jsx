<Fragment >
  <div>{this.props.buttonLabel}</div>
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="leave-group-modal">
    <ModalHeader tag="h4" toggle={this.props.toggle}>Leave group?</ModalHeader>
    <ModalBody>
      <h6>You are about to leave the group "{this.props.channelStore.channelName}", are you really done with those people?</h6>
    </ModalBody>
    <ModalFooter>
      <Button className="btn alert-color" onClick={e => this.leaveChannel(e)}>Leave</Button>{' '}
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</Fragment>