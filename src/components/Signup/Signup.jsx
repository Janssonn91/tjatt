<Container className="Signup">
  <Form>
    <h1 className="mt-5">Create account</h1>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <FormGroup className="mt-4">
          <Label for="username">Username</Label>
          <Input type="text" name="text" id="username" placeholder="with a placeholder" value={this.userNameToSet} onChange= {e => this.usernameChange(e)} />
        </FormGroup>
        <FormGroup className="mt-4">
          <Label for="nickname">Nickname</Label>
          <Input type="text" name="text" id="nickname" placeholder="with a placeholder" value={this.nicknameToSet} onChange= {e => this.nicknameChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" value={this.passWordToSet} onChange= {e => this.passwordChange(e)} />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col sm="12" md="12" lg="12" className="mt-4 mb-5 text-center">
        <Button color="info" onClick= {e => this.createUser(e)}>Sign up</Button>
      </Col>
    </Row>

  </Form>
</Container >