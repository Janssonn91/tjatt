<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} className="setting-modal">
  <ModalHeader tag="h4" toggle={this.props.toggle}>Profile settings</ModalHeader>
  <ModalBody>
    <Table hover borderless>
      <tbody>
        <tr>
          <th>Image upload</th>
          <td>
            <Label className="sr-only" for="changeImage" tag="h5">Image</Label>
            <Input
              type="file"
              name="image"
              id="changeImage"
              placeholder="image"
              style={{ borderColor: "black" }}
              onChange={e => this.onFileChange(e)}
              onKeyPress={e => e.key === 'Enter' && this.callUpdateSettings()}
            />
          </td>
        </tr>
        <tr>
          <th>Nickname</th>
          <td>
            <Label className="sr-only" for="changeNickname" tag="h5">Nickname</Label>
            <Input
              type="text"
              name="nickname"
              id="changeNickname"
              placeholder={this.props.loginStore.user.nickname}
              value={this.nickname}
              onChange={e => this.nickname = e.currentTarget.value}
              onKeyPress={e => e.key === 'Enter' && this.callUpdateSettings()}
            />
          </td>
        </tr>
        <tr>
          <th>Password</th>
          <td>
            <Label className="sr-only" for="currentPassword" tag="h5">Password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="currentPassword"
              placeholder="Current password"
              value={this.props.loginStore.currentPasswordValue}
              onFocus={e => this.passwordFocus()}
              onChange={e => this.currentPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Label className="sr-only" for="setNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="setNewPassword"
              placeholder="New password"
              value={this.props.loginStore.setNewPasswordValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.setNewPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Label className="sr-only" for="confirmNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              value={this.props.loginStore.confirmNewPasswordValue}
              onChange={e => this.confirmNewPassword(e)} />
          </td>
        </tr>
      </tbody>
    </Table>
    {this.props.loginStore.isNotCorrectPass && <Alert className="alert-color text-center">
      Incorrect current password</Alert>}
    {this.isNotSamePass && <Alert className="alert-color text-center">
      New passwords doesn't match</Alert>}
    {this.props.loginStore.savedNickname && <Alert color="success" className="text-center">
      New nickname saved!</Alert>}
    {this.props.loginStore.savedPassword && <Alert color="success" className="text-center">
      New password saved!</Alert>}

  </ModalBody>
  <ModalFooter>
    <Button
      disabled={this.props.loginStore.isNotCorrectPass || this.isNotSamePass}
      className="btn btn-save"
      onClick={() => this.callUpdateSettings()}
    >
      Save changes
    </Button>{' '}
    <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
  </ModalFooter>
</Modal>