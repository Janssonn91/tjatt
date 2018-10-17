<Router>
  {/* MobX observable style needs spread wrapping */}

  <div className="App d-flex flex-column" style={{ ...this.style }}>

   <Container tag="main" className="flex-grow-1">
      <Route exact path="/">
       <Row>
         <Col sm="3" className="side-menu">
         <Sidebar/></Col>
         <Col sm="9"className="dialog">
          <Chat />
         </Col>
       </Row>
      </Route>
      
    </Container>
   
  </div>

</Router>
