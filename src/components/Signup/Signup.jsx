<Container fluid={true} className="Signup">
  <Link to="/">
    <Button className="btn-to-login mt-3 ml-3">Back to login</Button>{' '}
  </Link>
  <Row>
    <Col className="overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
      <Form className="signupForm" onSubmit={this.onSubmit}>
        <h1 className="mt-5">Create account</h1>
        <FormGroup className="mt-4">
          <Input className={this.usernameExist ? "input-alert" : ''} type="text" name="username" id="username" placeholder="Choose username" onChange={e => this.usernameChange(e)} onFocus={e => this.removeError(e)} />
        </FormGroup>
        <FormGroup>
          <Input className={!this.validEmail || this.props.loginStore.emailExist ? "input-alert" : ''} type="text" name="useremail" id="useremail" placeholder="Enter your email" onChange={e => this.useremailChange(e)} onFocus={e => this.removeEmailError(e)} />
        </FormGroup>
        <FormGroup>
          <Input className={this.passwordsDontMatch ? "input-alert" : ''} type="password" name="password" id="userpassword" placeholder="Choose password" onChange={e => this.passwordChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input className={this.passwordsDontMatch ? "input-alert" : ''} type="password" name="password" id="confirmPassword" placeholder="Confirm password" onChange={e => this.confirmPasswordChange(e)} />
        </FormGroup>
        <div className="text-center mb-3">
          <Button className="overlay" disabled={this.validEmail && this.usernameToSet && this.useremailToSet.length && this.passWordToSet.length && (this.passWordToSet === this.confirmPassword) ? null : true}>Sign up</Button>
          {this.usernameExist &&
            < Alert className="my-3 alert-color">
              Username already in use, please choose another
            </Alert>
          }
          {this.props.loginStore.emailExist &&
            < Alert className="my-3 alert-color">
              Email already in use
            </Alert>
          }
          {this.passwordsDontMatch &&
            < Alert className="my-3 alert-color">
              Passwords doesn't match, please check
            </Alert>
          }
          {!this.validEmail &&
            < Alert className="my-3 alert-color">
              Please check your email
            </Alert>
          }
        </div>
      </Form>
    </Col>
  </Row>
</Container >

