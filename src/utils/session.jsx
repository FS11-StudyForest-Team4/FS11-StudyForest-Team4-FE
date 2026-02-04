const session = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const v = sessionStorage.getItem(key);
    if (!v || v === 'undefined') return null;
    return JSON.parse(v);
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};

export default session;
