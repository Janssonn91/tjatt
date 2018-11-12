<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} className="setting-modal">
  <ModalHeader tag="h4" toggle={this.props.toggle}>Profile settings</ModalHeader>
  <ModalBody>
    <Table hover borderless>
      <tbody>
        <tr>
          <th className="p-1">Image upload</th>
          <td className="p-1">
            <Label className="sr-only" for="changeImage" tag="h5">Image</Label>
            <Input
              className="my-2"
              type="file"
              name="image"
              id="changeImage"
              placeholder="image"
              autoComplete="off"
              style={{ borderColor: "black" }}
              onChange={e => this.onFileChange(e)}
              onKeyPress={e => e.key === 'Enter' && this.callUpdateSettings()}
            />
          </td>
        </tr>
        <tr>
          <th className="p-1">Nickname</th>
          <td className="p-1">
            <Label className="sr-only" for="changeNickname" tag="h5">Nickname</Label>
            <Input
              className="my-2"
              type="text"
              name="nickname"
              id="changeNickname"
              autoComplete="off"
              placeholder={this.props.loginStore.user.nickname}
              value={this.nickname}
              onChange={e => this.nickname = e.currentTarget.value}
              onKeyPress={e => e.key === 'Enter' && this.callUpdateSettings()}
            />
          </td>
        </tr>
        <tr>
          <th className="p-1">Password</th>
          <td className="p-1">
            <Label className="sr-only" for="currentPassword" tag="h5">Password</Label>
            <Input
              className="pw-input m-0"
              type="password"
              name="password"
              id="currentPassword"
              placeholder="Current password"
              autoComplete="off"
              value={this.props.loginStore.currentPasswordValue}
              onFocus={e => this.passwordFocus()}
              onChange={e => this.currentPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="p-1"></td>
          <td className="p-1">
            <Label className="sr-only" for="setNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input m-0"
              type="password"
              name="password"
              id="setNewPassword"
              placeholder="New password"
              autoComplete="off"
              value={this.props.loginStore.setNewPasswordValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.setNewPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td className="p-1"></td>
          <td className="p-1">
            <Label className="sr-only" for="confirmNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input m-0"
              type="password"
              name="password"
              id="confirmNewPassword"
              autoComplete="off"
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
  <ModalFooter className="p-2">
    <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    <Button
      disabled={this.props.loginStore.isNotCorrectPass || this.isNotSamePass}
      className="btn btn-save"
      onClick={() => this.callUpdateSettings()}
    >
      Save changes
    </Button>
  </ModalFooter>
</Modal>