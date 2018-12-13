<Fragment>
  <ScrollableFeed>
    <Row className="chat-header m-0 p-0">
      <Col sm="12" className="chat-about pl-3 pl-md-4">
        <Button
          className="mobil-menu d-inline-block d-md-none"
          onClick={e => this.props.channelStore.showMenu()}>
          <h2 className="sr-only">Show sidebar</h2>
          <i className="fas fa-ellipsis-v"></i>
        </Button>
        <span className="starpage-title">Sterred items</span>
      </Col>
    </Row>
    <hr className="mt-0 mb-2" />
    <Row className="chat-row">
      <Col className="pr-0">
        <ul className="chat-history pl-2 mr-1">
          {this.props.userStore.myStars.map((starMessage, i) => {
            return <StarMessage message={starMessage} index={i} />
          })}
        </ul>
      </Col>
    </Row>
  </ScrollableFeed>
</Fragment>