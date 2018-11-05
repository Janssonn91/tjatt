<Container fluid={true} className="Signup">
  <Link to="/">
    <Button className="btn-to-login mt-3 ml-3">Back to login</Button>{' '}
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
          <Input type="text" name="username" id="username" placeholder="Choose username" onChange={e => this.usernameChange(e)} onFocus={e => this.removeError(e)}/>
        </FormGroup>
        <FormGroup>
          <Input type="text" name="useremail" id="useremail" placeholder="Enter your email" onChange={e => this.useremailChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="userpassword" placeholder="Choose password" onChange={e => this.passwordChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="password" id="confirmPassword" placeholder="Confirm password" onChange={e => this.confirmPasswordChange(e)} />
        </FormGroup>
        <div className="text-center mb-3">
          <Button className="overlay" disabled={this.usernameToSet && this.useremailToSet.length && this.passWordToSet.length && (this.passWordToSet === this.confirmPassword) ? null : true}>Sign up</Button>
          {this.props.loginStore.usernameExits &&
            < Alert className="my-3 error-msg">
              Username already in use, please choose another
            </Alert>
          }
        </div>
      </Form>

    </Col>
  </Row>
</Container >

