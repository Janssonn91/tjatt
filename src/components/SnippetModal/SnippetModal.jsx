<div className="snippet-modal">
  <Modal isOpen={this.props.snippetVal} toggle={this.props.snippetToggle} className="snippet-modal">
    <ModalHeader>Write code or upload file</ModalHeader>
    <ModalBody>
      <Row className="justify-content-center pb-4">
        <Button onClick={this.switchTextFile} color="secondary">{this.textFile ? 'Switch to textinput' : 'Switch to fileupload'} <i className="fas fa-sync"></i></Button>
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
                onChange={this.getFileValue}
              />
              <label htmlFor="codefile" className="text-dark codefile">
                <i name="codefile" className="fas fa-file codefile upload-btn">&nbsp; Choose codefile</i>
              </label>
              <span className="file-value pl-5">File: {this.codefileValue}</span>
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