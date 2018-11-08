<Fragment>
  <div className="login-area">
    <Row>
      <Col className="mt-5 overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <h1>No boolshit, just  <img src="/images/tja@Logo.png" alt="" className="logo" /></h1>
      </Col>
    </Row>
    <Row className="mb-5">
      <Col className="overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <Form className="loginForm" onSubmit={this.onSubmit}>
          <FormGroup className="mt-4">
            <Input tabIndex="1" type="text" id="username" placeholder="Username" value={this.username} onChange={e => this.usernameChange(e)} />
          </FormGroup>
          <FormGroup>
            <Input tabIndex="2" type="password" id="password" placeholder="Password" value={this.password} onChange={e => this.passwordChange(e)} />
            <p className="small mt-2 text-center retrieve-pw d-none"><a onClick={e => this.retrievePassword(e)}>Can't remember your password?</a></p>
          </FormGroup>
          <div className="text-center mb-3">
            <Button tabIndex="3" className="btn-login">Login</Button>{' '}
            <Link tabIndex="-1" to="signup">
              <Button tabIndex="4" className="btn-create-acc">Create account</Button>{' '}
            </Link>
          </div>
        </Form>
        {this.props.loginStore.loginError &&
          < Alert color="danger" className="my-2">
            Username or password is incorrect
            </Alert>}
      </Col>
    </Row>
    <Row className="pb-5">
      <Col className="msg-area mt-5" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <h4 className="left-msg">Join for free and experience the power of tj@!</h4>
      </Col>
      <Col className="msg-area mt-5" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <h4 className="right-msg">Build powerful node.js-apps and share with teams!</h4>
      </Col>
    </Row>
  </div>
</Fragment>