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
      <Route path="/login" component={Login} />
    </Container>
  </div>

</Router>
