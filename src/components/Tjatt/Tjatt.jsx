<Container fluid={true} className="login-area">
  <Row className="m-0">
    <Col xs="12" md="3" className={this.props.channelStore.hideMenu === true ? "hide-menu" : "pr-0 pl-0"}>
      <div className="side-menu">
        <Sidebar />
      </div>
    </Col>
    {/* {if(this.props.channelStore.currentChannel)} */}
    <Col xs="12" md="9" className={this.props.channelStore.hideChat === true ? "hide-chat main-view" : "pr-0 pl-0 main-view"}>
      <div className="dialog">
        {this.props.match.params.id === "stars" && this.props.userStore.myStars ? <Stars /> : < Chat />}
      </div>
    </Col>
  </Row>
</Container>
