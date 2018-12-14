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

    {this.props.userStore.myStars.length > 0 ?
      <Row className="chat-row">
        <Col className="pr-0">
          <ul className="chat-history pl-2 mr-1 list-unstyled">
            {this.props.userStore.myStars.map((starMessage, i) => {
              return <StarMessage message={starMessage} key={i} />
            })}
          </ul>
        </Col>
      </Row>
      :
      <Row className="chat-row">
        <Col className="pr-0">
          <h6 className="pl-2 pt-3">You haven't starred any texts or files yet</h6>
        </Col>
      </Row>
    }
  </ScrollableFeed>

</Fragment>