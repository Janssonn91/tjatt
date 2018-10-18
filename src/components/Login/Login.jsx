<Fragment>
  {this.userLoggedIn === true ?
    <Container fluid={true} className="login-area">
      <Row>
         <Col sm="3" className="side-menu">
         <Sidebar
         logout={userLoggedIn => {this.userLoggedIn = userLoggedIn}}
         /></Col>
         <Col sm="9"className="dialog">
          <Chat />
         </Col>
       </Row>
          
  </Container>
   :
  <Container fluid={true} className="login-area">
    <Row>
      <Col className="mt-5" sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
        <h1>No boolshit, just tj@!</h1>
      </Col>
    </Row>
    <Row>
      <Col className="" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
        <FormGroup className="mt-4">
          <Input type="text" id="username" placeholder="Username" value={this.usernameToSet} onChange= {e => this.usernameChange(e)} />
        </FormGroup>
        <FormGroup>
          <Input type="text" id="password" placeholder="Password" value={this.passWordToSet} onChange= {e => this.passwordChange(e)} />
          <p className="small mt-1 d-none">Can't remember your password?</p>
        </FormGroup>
          <div className="mb-5">
            <Button className="btn-create-acc">Create account</Button>{' '}
            <Button className="btn-login" onClick={e => this.saveName()}>Login</Button>{' '}
          </div>
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