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
      <Form className="signupForm" onSubmit={this.onSubmit}>
        <FormGroup className="mt-4">
          <Input type="text" name="username" id="username" placeholder="Choose username" onChange={e => this.usernameChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="examplePassword" placeholder="Choose password" onChange={e => this.passwordChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" onChange={e => this.confirmPasswordChange(e)} />
        </FormGroup>
        <div className="text-center mb-3">
          <Button className="overlay" disabled={this.usernameToSet && this.passWordToSet.length && (this.passWordToSet === this.confirmPassword) ? null : true}>Sign up</Button>
          {this.usernameExits &&
            < Alert color="danger" className="my-2">
              Username already in use, please choose another
          </Alert>}
        </div>
      </Form>

    </Col>
  </Row>
</Container >

