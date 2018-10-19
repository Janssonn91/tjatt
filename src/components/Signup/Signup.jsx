<Container fluid={true} className="Signup">
  <Link to="/">
    <Button className="btn-to-login mt-3 ml-3">&lt;- To login</Button>{' '}
  </Link>
  <Row>
    <Col className="mt-4 overlay" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
      <h1 className="mt-5">Create account</h1>
    </Col>
  </Row>
  <Row>
    <Col className="overlay" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
    <Form>
      <FormGroup className="mt-4">
        <Input type="text" name="username" id="username" placeholder="Choose username"  value={this.usernameToSet} onChange={e => this.usernameChange(e)}/>
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="examplePassword" placeholder="Choose password" value={this.passWordToSet} onChange={e => this.passwordChange(e)} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" />
      </FormGroup>
      </Form>
      <div className="text-center mb-3">
        <Button className="overlay" onClick= {e => this.createUser(e)}>Sign up</Button>
        {this.usernameExits &&
          < Alert color="danger" className="my-2">
            Username already in use, please choose another
          </Alert>}
      </div>
    </Col>
  </Row>  
</Container >