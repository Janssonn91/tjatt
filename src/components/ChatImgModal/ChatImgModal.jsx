<div className="chatImgModal">
  <Modal isOpen={this.props.toggleVal} toggle={this.props.toggleModal}>
    <ModalHeader toggle={this.props.toggleModal} className="modal-header">{this.props.title}</ModalHeader>
    <ModalBody className="image-modal-body">
      <img src={this.props.imgPath} alt="chat-img" className="img-fluid" />
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={this.props.toggleModal}>Close</Button>
    </ModalFooter>
  </Modal>
</div>