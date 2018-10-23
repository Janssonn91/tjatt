<Fragment>
  <ConfirmModal isOpen={this.props.isOpen} keyboard={this.props.keyboard}>
    <ModalHeader toggle={e => this.toggle()}>
      Välkommen till dig som ser detta!
    </ModalHeader>
    <ModalBody>
      <p>Mitt namn är Niklas</p>
    </ModalBody>
    <ModalFooter>
      <p>Jansson</p>
    </ModalFooter>
  </ConfirmModal>
</Fragment>