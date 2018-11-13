<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/server" component={Server} />
        <Route path="/git" component={GitApps} />
        {this.stores.Login && this.stores.Login.user && this.stores.Login.user.username ?
        <PrivateRoute path={`/${this.stores.Login.user.username}`} component={Tjatt} />
      : null}
        <Route>
          <h1>This is not the chat you are looking for</h1>
          <p>Use the force to find the right chat, or type a correct URL</p>
        </Route>
      </Switch>
    </Container>
  </div>

</Router>
