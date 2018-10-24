<Fragment>
  <Modal className="createGroupModal" isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} >
    {this.props.children}
    <ModalHeader tag="h4" toggle={e => this.props.toggle()}>
    hej
    </ModalHeader>
    <ModalBody>
      <p>då</p>
    </ModalBody>
  </Modal>
</Fragment>