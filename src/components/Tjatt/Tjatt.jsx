<Container fluid={true} className="login-area">
  <Row className="m-0">
    <Col xs="12" md="3" className={this.hideMenu === true ? "hide-menu" : "pr-0 pl-0"}>
      <div className="side-menu">
        <Sidebar toMenu={this.sendToMenu} />
      </div>
    </Col>
     {/* {if(this.props.channelStore.currentChannel)} */}
    <Col xs="12" md="9" className={this.hideChat === true ? "hide-chat" : "pr-0 pl-0"}>
      <div className="dialog">
        <Chat toChat={this.sendToChat} />
      </div>
    </Col>
  </Row>
</Container>
