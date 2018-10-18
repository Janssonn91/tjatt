<Fragment>
  {this.userLoggedIn === true ?
    <Container className="login-area">
    <Row>
      <Col className="mt-5 mb-5" sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
        <h1>Inloggad!</h1>
      </Col>
    </Row>    
  </Container>
   :
  <Container className="login-area">
    <Row>
      <Col className="mt-5" sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
        <h1>No boolshit, just tj@!</h1>
      </Col>
    </Row>
    <Row>
      <Col className="" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <Button className="btn-create-acc pull-left mt-4">Create account</Button>{' '}
        <FormGroup className="mt-4">
          <Input type="text" id="username" placeholder="Username" value={this.usernameToSet} onChange= {e => this.usernameChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="text" id="password" placeholder="Password" value={this.passWordToSet} onChange= {e => this.passwordChange(e)} />
          <p className="small mt-1">Can't remember your password?</p>
        </FormGroup>
          <Button className="btn-login pull-right mb-5" onClick={e => this.saveName()}>Login</Button>{' '}
      </Col>
    </Row>
    <Row className="pb-5">
      <Col className="msg-area" sm="10" md={{ size: 4, offset: 1 }}>
        <h5 className="left-msg">Join for free and experience the power of tj@!</h5>
      </Col>
      <Col className="msg-area" sm="10" md={{ size: 4, offset: 2 }}>
        <h5 className="right-msg">Build powerful node.js-apps and share with teams!</h5>
      </Col>
    </Row>
  </Container>
  }
</Fragment>