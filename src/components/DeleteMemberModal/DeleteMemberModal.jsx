<Fragment >
  {/* <div onClick={this.props.toggleMember}>{this.props.buttonLabel}</div> */}
  <div>{this.props.buttonLabel}</div>
  <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="delete-member-modal">
    <ModalHeader toggle={this.props.toggle}>{this.props.buttonLabel}</ModalHeader>
    <ModalBody>
      <Input></Input>
      <Label for="searchAddMemeber"> Search member</Label>
      <Input type="text" id="searchAddMemeber" />
      <Form>
        <FormGroup tag="fieldset">
          <legend>Group members</legend>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" value="member 1" />{' '}
              Member 1
                            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" value="member 2" />{' '}
              Member 2
                            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="checkbox" value="Member 3" />{' '}
              Member 3
                            </Label>
          </FormGroup>
        </FormGroup>
      </Form>


    </ModalBody>
    <ModalFooter className="p-2">
      <Button className="btn btn-delete" onClick={() => console.log("delete")}>Delete</Button>{' '}
      <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    </ModalFooter>

  </Modal>
</Fragment>

