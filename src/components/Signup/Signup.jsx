<Container className="Signup">
  <Link to="/">
    <Button className="btn-to-login">&lt;- To login</Button>{' '}
  </Link>
  <Form>
    <h1 className="mt-5">Create account</h1>
    <Row>
      <Col sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <FormGroup className="mt-4">
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="Choose username"  value={this.usernameToSet} onChange={e => this.usernameChange(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Choose password" value={this.passWordToSet} onChange={e => this.passwordChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col sm="12" md="12" lg="12" className="mt-4 mb-5 text-center">
        <Button color="info" onClick= {e => this.createUser(e)}>Sign up</Button>
        {this.usernameExits &&
          < Alert color="danger" className="my-2">
            Username already in use, please choose another
          </Alert>}
      </Col>
    </Row>

  </Form>
</Container >