<div>
  <Modal isOpen={this.props.codeModal} className={this.props.className}>
    <ModalHeader >Modal title</ModalHeader>
    <ModalBody>
      hej
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>
