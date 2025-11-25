'use client'

export function setCookie(cName, cVal, expDays) {
  const d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cName + "=" + cVal + ";" + expires + ";path=/";
}

export function removeCookie(cName) {
  setCookie(cName, 'cookie is removed', -1);
}

export function cookieVal(cName) {
  let name = cName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function isCookie(cName) {
  const cVal = cookieVal(cName)
  if (cVal != '') return true
  return false
}