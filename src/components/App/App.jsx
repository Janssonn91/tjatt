<Router>
  {/* MobX observable style needs spread wrapping */}
  <div className="App d-flex flex-column" style={{ ...this.style }}>
    <header>
      <MainNav />
    </header>
    <Container tag="main" className="flex-grow-1">
      <Route exact path="/">
        <Row>
          <Col className="col-12 mt-3">
            <h1>REST example</h1>
            <p>
              This is an example of using REST to fetch some data (books) from a
              backend database.
            </p>
          </Col>
          {/* {this.books.map(book =>
            <Col key={book._id} className="col-12 border mt-3">
            {Object.keys(book).filter(propName =>
              !(['_id', '__v', 'link', 'imageLink'].includes(propName))
            ).map(propName =>
              <p className="m-0" key={propName}><span className="book-prop">{propName}:</span> {propName === 'author' ?
                 book[propName].name : book[propName]
                }</p>
            )}
            </Col>
          )} */}
        </Row>
        <Row>
          <Col className="col-12 col-lg-8 offset-lg-2">
            <Jumbotron className="mt-5 light-blue-bg">
              <h1 className="display-3">Welcome!</h1>
              <p className="lead">
                This is a simple example app, illustrating some of the things
                you can do with React Warp Core.
              </p>
              <hr className="my-2" />
              <p>
                <b>React Warp Core</b> automatically creates new projects
                bootstrapped with{" "}
                <ExLink href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md">
                  create-react-app
                </ExLink>{" "}
                <i>and</i> adds som nice extras, like:
              </p>
              <ul>
                <li>
                  <ExLink href="https://reacttraining.com/react-router/web/guides/quick-start">
                    React Router
                  </ExLink>
                </li>
                <li>
                  <ExLink href="https://mobx.js.org/getting-started.html">
                    MobX
                  </ExLink>
                </li>
                <li>
                  <ExLink href="https://getbootstrap.com/">Bootstrap</ExLink>{" "}
                  support with{" "}
                  <ExLink href="https://reactstrap.github.io/">
                    reactstrap
                  </ExLink>
                </li>
                <li>
                  <ExLink href="https://webpack.js.org/">webpack</ExLink>{" "}
                  compiling of{" "}
                  <ExLink href="https://sass-lang.com/guide">SCSS</ExLink>
                </li>
                <li>
                  optional separate template files (rather nice when you want to
                  focus on your templating <i>or</i> programming logic
                  separately)
                </li>
                <li>
                  lazy imports from an import list (a <i>lot</i> of less import
                  cruft at the beginning of your component code){" "}
                </li>
                <li>
                  this small example app that illustrates some core concepts.
                </li>
              </ul>
              <p className="lead clearfix">
                <Link className="float-right" to="/todo-list">
                  <Button color="light">Try out the todo list »</Button>
                </Link>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Route>
      <Route path="/clock" component={Clock} />
    </Container>
    <footer className="bg-light mt-3">
      <small>
        React Warp Core &ndash; example app&nbsp;&nbsp;© Thomas Frank
      </small>
    </footer>
  </div>
</Router>
