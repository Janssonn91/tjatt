<div className="snippet-modal">
  <Modal isOpen={this.props.snippetVal} toggle={this.props.snippetToggle} className={this.props.className}>
    <ModalHeader>Write code or upload file</ModalHeader>
    <ModalBody>
      <Row className="justify-content-center pb-4">
        <Button onClick={this.switchTextFile} color="secondary">{this.textFile ? 'Upload file' : 'Paste/type code'} <i className="fas fa-sync"></i></Button>
      </Row>
      <Row>
        <Col lg="12" md="12">
          {!this.textFile ? <textarea className="w-100" rows="8"></textarea> : <input type="file"></input>}

        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
      <Button color="success" onClick={this.toggle}>Send snippet</Button>{' '}
      <Button color="secondary" onClick={this.props.snippetToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>