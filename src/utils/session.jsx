const session = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const v = sessionStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};

export default session;
