<div className="snippet-modal">
  <Modal isOpen={this.props.snippetVal} toggle={this.props.snippetToggle} className={this.props.className}>
    <ModalHeader>Write code or upload file</ModalHeader>
    <ModalBody>
      <Row className="justify-content-center pb-4">
        <Button onClick={this.switchTextFile} color="secondary">{this.textFile ? 'Upload file' : 'Paste/type code'} <i className="fas fa-sync"></i></Button>
      </Row>
      <Row>
        <Col lg="12" md="12">
          {!this.textFile ? <textarea className="w-100" rows="8"></textarea> :
            <div>
              <input
                type="file"
                className="codefile d-none"
                name="codefile"
                id="codefile"
              />
              <label htmlFor="codefile" className="text-dark codefile">
                <i name="codefile" className="fas fa-file codefile"></i>&nbsp; Choose codefile
              </label>
            </div>
          }
          {this.props.channelStore.channelChatHistory.map((message, i) => {
            message.contentType === 'code'
          })}
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
      <Button color="success" onClick={() => { this.props.codeFileMethod(); this.props.snippetToggle() }}>Send snippet</Button>{' '}
      <Button color="secondary" onClick={this.props.snippetToggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>