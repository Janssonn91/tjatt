<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        {this.stores.Login.user && <PrivateRoute path={`/${this.stores.Login.user.username}`} component={Tjatt} />}
      </Switch>
    </Container>
  </div>
</Router>
