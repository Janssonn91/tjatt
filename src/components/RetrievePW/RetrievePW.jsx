<Container fluid={true} className="Retrieve">
  <Row>
    <Col xs="12">
      <Link to="/">
        <Button className="btn-to-login mt-3 ml-3">Back to login</Button>{' '}
      </Link>
      <Link to="signup">
        <Button className="btn-to-login mt-3 ml-3 float-right">Create account</Button>{' '}
      </Link>
    </Col>
    <Col className="overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
      <Form className="signupForm" onSubmit={this.onSubmit}>
        <h1 className="mt-5">Retrieve your password</h1>
        <p className="small info">It's easy to forget, but don't worry you can get a new password! Just fill in the correct mailadress to your account and a new password will be sent to you. Don't forget to change the password in your settings later!</p> 
        <FormGroup>
          <Input className={!this.validEmail ? "input-alert" : ''} type="text" name="useremail" id="useremail" placeholder="Enter your email" onChange={e => this.useremailChange(e)} onFocus={e => this.removeEmailError(e)} />
        </FormGroup>
        <div className="text-center mb-3">
          <Button className="overlay" disabled={this.useremailToRetrieve.length > 0 && this.validEmail ? null : true}>Reset password</Button>
          {this.emailDontExist &&
            < Alert className="my-3 alert-color text-center">
              Email don't exist, please check your input
            </Alert>
          }
          {this.successInfo && 
            <Alert color="success" className="my-3 text-center">
              Password reset!
            </Alert>}
        </div>
      </Form>
    </Col>
  </Row>
</Container >

