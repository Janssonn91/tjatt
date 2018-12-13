<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      {this.props.userStore.isLoading ?
        <div className="loading-container">
          <div className="loading">
            {/* <span className="letters" id="letterOne">i</span>
            <span className="letters" id="letterTwo">n</span>
            <span className="letters" id="letterThree">g</span>
            <span className="letters" id="letterFour">d</span>
            <span className="letters" id="letterFive">L</span>
            <span className="letters" id="letterSix">o</span>
            <span className="letters" id="letterSeven">a</span> */}
          </div>
        </div>
        :
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/retrievepassword" component={RetrievePW} />
          <Route path="/server" component={Server} />
          <Route path="/git-app" component={GitApp} />
          {this.props.userStore.isLoggedIn ?
            <PrivateRoute path={`/${this.props.userStore.user.username}/:id?`} component={Tjatt} /> :
            <Route path="/" component={Loading} />
          }

          {/* 404 */}
          <Route>
            <h1>This is not the chat you are looking for</h1>
            <p>Use the force to find the right chat, or type a correct URL</p>
          </Route>
        </Switch>
      }
    </Container>
  </div>

</Router>
