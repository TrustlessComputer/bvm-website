class CookieUtil {
  set(name: string, val: string, expires = 3650) {
    const date = new Date();
    const value = val;

    // Set it expire default in 10 years
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie =
      name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
  }

  get(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length == 2) {
      return parts.pop()?.split(';')?.shift();
    }
  }

  delete(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }
}

const instance = new CookieUtil();

export default instance;
