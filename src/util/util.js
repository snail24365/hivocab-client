export function setCookie(cookie_name, value, miuntes) {
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + miuntes);
  const cookie_value = escape(value) + ((miuntes == null) ? '' : '; expires=' + expireDate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

export function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}
function getCookie(name) {
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(name + '=');
  });
}

export function removeBraceAndEscaping(origin) {
  return origin.replace(/\{[\w\d\|]+\}/gi, "")
    .replace(/&apos;/gi, "'")

}