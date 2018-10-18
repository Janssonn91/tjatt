<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{...this.style}}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      <Route exact path="/">
       <Row>
         <Col sm="3" className="side-menu">
         <Sidebar/></Col>
         <Col sm="9"className="dialog">
          <Chat />
         </Col>
       </Row>
        <Login />
      </Route>
      <Route path="/clock" component={Clock} />
      <Route path="/login" component={Login} />
    </Container>
    <footer className="bg-light mt-3">
      <small>React Warp Core &ndash; example app&nbsp;&nbsp;© Thomas Frank</small>
    </footer>
  </div>

</Router>
