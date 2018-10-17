<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>

   <Container tag="main" className="flex-grow-1">
      <Route exact path="/">
       <Row>
         <Col className="side-menu"></Col>
         <Col className="dialog">
          <Chat></Chat>
         </Col>
       </Row>
      </Route>
      
    </Container>
   
  </div>
</Router>
