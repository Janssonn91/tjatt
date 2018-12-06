// Even if you write correct user's url direct,
// you cannot go to your page if you didn't login
<Route path={this.props.path} render={() => {
  if (!this.props.userStore.isLoggedIn) {
    return <Redirect to={{
      pathname: '/',
      state: { from: this.props.location }
    }} />
  }
  return <this.props.component {...this.props} />
}} />