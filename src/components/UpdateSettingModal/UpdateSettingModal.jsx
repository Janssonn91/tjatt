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
              onChange={(e) => this.nickname = e.currentTarget.value}
              style={{ width: "70%" }}
            />
          </td>
        </tr>
        <tr>
          <th colSpan="2">Password</th>
        </tr>
        <tr>
          <td>current password</td>
          <td>
            <Label className="sr-only" for="currentPassword" tag="h5">Password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="currentPassword"
              value={this.currentPasswordValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.currentPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td>new password</td>
          <td>
            <Label className="sr-only" for="setNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="setNewPassword"
              value={this.setNewPasswordValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.setNewPassword(e)}
            />
          </td>
        </tr>
        <tr>
          <td>new password</td>
          <td>
            <Label className="sr-only" for="confirmNewPassword" tag="h5">New password</Label>
            <Input
              className="pw-input"
              type="password"
              name="password"
              id="confirmNewPassword"
              value={this.confirmNewPasswordValue}
              onClick={e => e.stopPropagation()}
              onChange={e => this.confirmNewPassword(e)} />
          </td>
        </tr>
      </tbody>
    </Table>
    {this.isNotCorrectPass && <Alert className="alert-color">
      Incorrect current password</Alert>}
    {this.isNotSamePass && <Alert className="alert-color">
      You filled in different password</Alert>}
  </ModalBody>
  <ModalFooter>
    <Button
      disabled={this.isNotCorrectPass || this.isNotSamePass}
      className="btn btn-save"
      onClick={() =>
        this.props.loginStore.updateSettings({ nickname: this.nickname, password: this.newPassword, imageFormData: this.image })
      }
    >
      Save changes
    </Button>{' '}
    <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
  </ModalFooter>
</Modal>