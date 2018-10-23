<Container fluid={true} className="login-area">
  <Row className="m-0">
    <Col xs="12" md="3" xl="2" className={this.hideMenu === true ? "hide-menu" : "pr-0 pl-0"}>
      <div className="side-menu">
        <Sidebar toMenu={this.sendToMenu} logout={userLoggedIn => { this.userLoggedIn = userLoggedIn }} />
      </div>
    </Col>
    <Col xs="12" md="9" xl="10" className={this.hideChat === true ? "hide-chat" : "pr-0 pl-0"}>
      <div className="dialog">
        <Chat toChat={this.sendToChat} />
      </div>
    </Col>
  </Row>
</Container>
