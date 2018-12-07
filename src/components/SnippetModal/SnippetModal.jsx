<div className="snippet-modal">
  <Modal isOpen={this.props.snippetVal} toggle={this.props.snippetToggle} className="snippet-modal">
    <ModalHeader>Write code or upload file</ModalHeader>
    <ModalBody>
      <Row className="justify-content-center pb-4">
        <Button onClick={this.switchTextFile} color="secondary">{this.uploadOrText ? 'Switch to textinput' : 'Switch to fileupload'} <i className="fas fa-sync"></i></Button>
      </Row>
      <Row>
        <Col lg="12" md="12">
          {!this.uploadOrText ? <textarea value={this.codeMessage} onKeyDown={this.tabTextArea} onChange={e => this.codeMessage = e.target.value} className="w-100 text-value" rows="8" placeholder="Write/paste your code here"></textarea> :
            <div>
              <input
                type="file"
                className="codefile d-none"
                name="codefile"
                id="codefile"
                onChange={this.props.fileValueMethod}
              />
              <label htmlFor="codefile" className="text-dark codefile">
                <i name="codefile" className="fas fa-file codefile upload-btn">&nbsp; Choose codefile</i>
              </label>
              <span className="file-value pl-5">File: {this.props.fileValue || 'no file chosen'}</span>
              {this.props.uploadError &&
                <Alert className="alert-danger">
                  {this.props.fileValue} is not a code file
                </Alert>
              }
            </div>
          }

        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
      {this.uploadOrText ?
        <div className="file-upload">
          <Button color="success" onClick={() => { this.props.codeFileMethod(); }}>Send snippet</Button>{' '}
          <Button color="secondary" onClick={this.props.snippetToggle}>Cancel</Button>
        </div> :
        <div className="text-upload">
          <Button color="success" onClick={() => { this.props.textMethod(this.codeMessage); this.props.snippetToggle() }}>Send snippet</Button>{' '}
          <Button color="secondary" onClick={this.props.snippetToggle}>Cancel</Button>
        </div>
      }
    </ModalFooter>
  </Modal>
</div>