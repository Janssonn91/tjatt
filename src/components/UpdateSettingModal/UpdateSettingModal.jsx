<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} className="setting-modal">
  <ModalHeader tag="h4" toggle={this.props.toggle}>Profile settings</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup className="m-0">
        <Label className="btn btn-upload m-0 p-0" htmlFor="files">Choose image</Label>
        <Input className="d-none" id="files" type="file" name="files" onChange={this.onFileChange} />
        <Label for="changeImage" tag="h5">Image</Label>
        <p>Current Image: {this.props.loginStore.user.image}</p>
        <Input type="file" name="image" id="changeImage" placeholder="image" />
      </FormGroup>
      <hr />
      <FormGroup className="form-inline">
        <Label for="changeNickname" tag="h5" className="mr-3">Nickname</Label>
        <Input
          type="text"
          name="nickname"
          id="changeNickname"
          placeholder={this.props.loginStore.user.nickname}
          value={this.nickname}
          onChange={(e) => this.nickname = e.currentTarget.value}
          style={{ width: "70%" }}
        />
      </FormGroup>
      <hr />
      <FormGroup>
        <Label for="changePassword" tag="h5">Password</Label>
        <p>You can change your password</p>
        <Input
          type="password"
          name="password"
          id="changePassword"
          placeholder={this.props.loginStore.user.password}
          value={this.currentPassword}
          onChange={(e) => this.currentPassword = e.currentTarget.value}
        />
      </FormGroup>
      <Button>Confirm</Button>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={() => this.props.loginStore.updateSettings(this.nickname)}>Save</Button>{' '}
    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
  </ModalFooter>
</Modal>