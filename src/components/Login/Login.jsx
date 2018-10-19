<Fragment>
  {this.userLoggedIn === true ?
    <Container fluid={true} className="login-area">
      <Row className="mr-0">
        <Col md="3" xl="2" className="side-menu">
          <Navbar className="p-0" light expand="md">
            <NavbarBrand tag="div" className="mr-0 d-md-none">
              <ChatHeader/>
            </NavbarBrand>
            <NavbarToggler onClick={e => this.toggle()} />
            <Collapse isOpen={this.collapseOpen} navbar>
              <Nav className="ml-auto" vertical>
                <Sidebar logout={userLoggedIn => { this.userLoggedIn = userLoggedIn }} />
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
        <Col xs="12" md="9" xl="10" className="dialog">
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
      <Row className="mb-5">
        <Col className="" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <FormGroup className="mt-4">
            <Input type="text" id="username" placeholder="Username" value={this.usernameToSet} onChange={e => this.usernameChange(e)} />
          </FormGroup>
          <FormGroup>
            <Input type="password" id="password" placeholder="Password" value={this.passWordToSet} onChange={e => this.passwordChange(e)} />
            <p className="small mt-1 d-none">Can't remember your password?</p>
          </FormGroup>
          <div className="text-center">
            <Link to="signup">
              <Button className="btn-create-acc">Create account</Button>{' '}
            </Link>
            <Button className="btn-login" onClick={e => this.login()}>Login</Button>{' '}
          </div>
          {this.loginError &&
            < Alert color="danger" className="my-2">
              Användarnamn eller lösenord är inte korrekt
            </Alert>}
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