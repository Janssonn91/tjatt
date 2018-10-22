<Container fluid={true} className="Signup">
  <Link to="/">
    <Button className="btn-to-login mt-3 ml-3">&lt;- To login</Button>{' '}
  </Link>
  <Row>
    <Col className="mt-4 overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
      <h1 className="mt-5">Create account</h1>
    </Col>
  </Row>
  <Row>
    <Col className="overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
    <Form id="crete-account-form">
      <FormGroup className="mt-4">
        <Input type="text" name="username" id="username" placeholder="Choose username" value={this.usernameToSet} onChange={e => this.usernameChange(e)}/>
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" placeholder="Choose password" value={this.passWordToSet} onChange={e => this.passwordChange(e)} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" value={this.confirmPasswordToSet} onChange={e => this.confirmPasswordChange(e)} />
      </FormGroup>
      </Form>
      <div className="text-center mb-3">
        <Button className="overlay" onClick= {e => this.checkUserInput(e)}>Sign up</Button>
        {this.usernameExits &&
          < Alert color="danger" className="my-2">
            Username already in use, please choose another
          </Alert>}
          {this.passwordMissing &&
          < Alert color="danger" className="my-2">
            Please enter a password
          </Alert>}
          {this.passwordsNotMacthing &&
          < Alert color="danger" className="my-2">
            Passwords not matching, please check
          </Alert>}
          {this.usernameMissing &&
          < Alert color="danger" className="my-2">
            Please choose a username
          </Alert>}
          {this.passwordMissing &&
          < Alert color="danger" className="my-2">
            Please set a password
          </Alert>}
      </div>
    </Col>
  </Row>  
</Container >