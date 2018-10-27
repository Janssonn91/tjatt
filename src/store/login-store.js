class LoginStore {
  @observable user = {};
  @observable loginError = false;

  @action checkIfLoggedIn() {
    fetch('/api/login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.loggedIn) {
          this.user = res.user;
        }
      }).catch(err => {
        console.log("err", err)
      })
  }

  @action login(username, password) {
    fetch('/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.user = res.user;
        }
        this.loginError = true;
      }).catch(err => {
        console.log("err", err)
      })
  }

  @action signUp(username, password) {
    fetch('/api/users',
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('created user: ' + username)

          this.user = res.user
          this.usernameExits = false;
        } else {
          this.usernameExits = true;
        }
      }).catch((err) => {
        console.log('error', err);
      });
  }

}

export const loginStore = new LoginStore();
