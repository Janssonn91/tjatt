<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{...this.style}}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        {this.stores.Login && this.stores.Login.user && this.stores.Login.user.username ?
        <PrivateRoute path={`/${this.stores.Login.user.username}`} component={Tjatt} />
      : null}
        <Route>
          {/* 404 */}
          <h1>This site can't be reached</h1>
          <p>This address could not be found</p>
        </Route>
      </Switch>
    </Container>
  </div>

</Router>
