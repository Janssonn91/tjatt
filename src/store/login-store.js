class LoginStore {
  @observable user;

  @action getuser(user) {
    this.user = user;
    console.log(user)
  }
}

export const loginStore = new LoginStore();
