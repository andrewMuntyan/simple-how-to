let Auth = {
  login(name, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true, name);
      return
    }
    pretendRequest(name, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
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
  setTimeout(() => {
    cb({
      name: name || prompt('You should set username', 'user'),
      authenticated: true,
      token: Math.random().toString(36).substring(7)
    })
  }, 0)
}

export default Auth;