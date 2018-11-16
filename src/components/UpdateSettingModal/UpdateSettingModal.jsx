<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} keyboard={this.props.keyboard} className="setting-modal">
  <ModalHeader tag="h4" toggle={this.props.toggle}>Profile settings</ModalHeader>
  <ModalBody>
    <Table hover borderless>
      <tbody>

        <tr>
          <th className="p-1">Image upload</th>
          <td className="p-1">
            <div className="image-upload">
              <div className="image-edit">
                <Input
                  className="my-2"
                  type="file"
                  name="image"
                  id="changeImage"
                  placeholder="image"
                  autoComplete="off"
                  onChange={e => this.onFileChange(e)}
                  onKeyPress={e => e.key === 'Enter' && this.callUpdateSettings()}
                />
                <Label for="changeImage">
                  <i className="fas fa-pencil-alt edit-icon"></i>
                </Label>
              </div>
              <div className="image-preview">
                <div id="imagePreview" style={{ backgroundImage: `url(${this.imgPath})` }}></div>
              </div>
            </div>
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
              onChange={e => this.handleNicknameChange(e)}
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
              value={this.currentPasswordValue}
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
              value={this.setNewPasswordValue}
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
              value={this.confirmNewPasswordValue}
              onChange={e => this.confirmNewPassword(e)} />
          </td>
        </tr>
      </tbody>
    </Table>
    {this.isNotCorrectPass && <Alert color="danger" className="text-center">
      Incorrect current password</Alert>}
    {this.isNotSamePass && <Alert color="danger" className="text-center">
      New passwords doesn't match</Alert>}
    {this.savedNickname && <Alert color="success" className="text-center">
      New nickname saved!</Alert>}
    {this.savedPassword && <Alert color="success" className="text-center">
      New password saved!</Alert>}
    {this.areAllEmpty && <Alert color="warning" className="text-center">
      You must fill in one of the fields to save your data</Alert>}
  </ModalBody>
  <ModalFooter className="p-2">
    <Button className="btn btn-cancel" onClick={this.props.toggle}>Cancel</Button>
    <Button
      disabled={this.isNotCorrectPass || this.isNotSamePass}
      className="btn btn-save"
      onClick={() => this.updateSettings({
        nickname: this.nickname,
        password: this.newPassword,
        imageFormData: this.image,
        currentPassword: this.currentPasswordValue
      })}
    >
      Save changes
    </Button>
  </ModalFooter>
</Modal>