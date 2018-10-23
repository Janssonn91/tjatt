<Fragment>
  {this.userLoggedIn === true ?
    <Tjatt/>
    :
    <div className="login-area">
      <Row>
        <Col className="mt-5 overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h1>No boolshit, just tj@!</h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="overlay" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <FormGroup className="mt-4">
            <Input type="text" id="username" placeholder="Username" value={this.usernameToSet} onChange={e => this.usernameChange(e)} />
          </FormGroup>
          <FormGroup>
            <Input type="password" id="password" placeholder="Password" value={this.passWordToSet} onChange={e => this.passwordChange(e)} />
            <p className="small mt-1 d-none">Can't remember your password?</p>
          </FormGroup>
          <div className="text-center mb-3">
            <Link to="signup">
              <Button className="btn-create-acc">Create account</Button>{' '}
            </Link>
            <Button className="btn-login" onClick={e => this.login()}>Login</Button>{' '}
          </div>
          {this.loginError &&
            < Alert color="danger" className="my-2">
              Username or password is incorrect
            </Alert>}
        </Col>
      </Row>
      <Row className="pb-5">
        <Col className="msg-area mt-5" sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <h4 className="left-msg">Join for free and experience the power of tj@!</h4>
        </Col>
        <Col className="msg-area mt-5" sm={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }}>
          <h4 className="right-msg">Build powerful node.js-apps and share with teams!</h4>
        </Col>
      </Row>
    </div>
  }
</Fragment>