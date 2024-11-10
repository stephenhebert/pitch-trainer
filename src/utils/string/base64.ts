function encode(string: string): string {
  return btoa(encodeURIComponent(string))
}

function decode(string: string): string {
  return decodeURIComponent(atob(string))
}

export {
  encode,
  decode
}