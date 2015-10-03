let Auth = {
  login(name, cb) {
    if (this.getName()) {
      if (cb) cb(true);
      this.onChange(true, name);
      return
    }
    pretendRequest(name, (res) => {
      if (res.authenticated) {
        localStorage.token = JSON.stringify({
          name: name,
          token: res.token
        });
        if (cb) cb(true);
        this.onChange(true, res.name)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  //TODO: improve this
  getName() {
    let token = this.getToken();
    if (token) {
      return JSON.parse(token).name;
    }
    return false;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
};

function pretendRequest(name, cb) {
  cb({
    name: name,
    authenticated: name && name.length && typeof name === 'string',
    token: Math.random().toString(36).substring(7)
  })
}

export default Auth;