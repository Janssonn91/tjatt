<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>
    <Container fluid={true} tag="main" className="flex-grow-1">
      {this.props.loginStore.isLoading ?
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
          <Route path="/server" component={Server} />
          {this.props.loginStore.user &&
            <PrivateRoute path={`/${this.props.loginStore.user.username}`} component={Tjatt} />
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
