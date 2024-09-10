export const getCookies = () => {
  try {
    const cookies = document.cookie.split(";").reduce((res, c) => {
      const [key, val] = c.trim().split("=").map(decodeURIComponent);
      try {
        return Object.assign(res, { [key]: JSON.parse(val) });
      } catch (e) {
        return Object.assign(res, { [key]: val });
      }
    }, {});

    return cookies;
  } catch (error) {
    return "";
  }
};

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}; path=/`;
};
