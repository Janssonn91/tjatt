<Fragment >
  <div>{this.props.buttonLabel}</div>
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="leave-group-modal">
    <ModalHeader tag="h4" toggle={this.props.toggle}>Leave group?</ModalHeader>
    <ModalBody>
      {this.props.channelStore.currentGroupMembers.length === 1 ? <h6>You are about to leave the group "        {this.props.channelStore.channelName}" as the last member. This will dissolve the group.</h6>
      : 
      <h6>You are about to leave the group "{this.props.channelStore.channelName}", are you sure about this?</h6>
      }
    </ModalBody>
    <ModalFooter>
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
      <Button className="btn btn-leave-group" onClick={e => this.leaveChannel(e)}>Leave</Button>
    </ModalFooter>
  </Modal>
</Fragment>