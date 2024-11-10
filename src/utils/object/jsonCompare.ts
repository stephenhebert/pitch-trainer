export default function jsonCompare(a: any, b: any) {
  return (a && JSON.stringify(a)) === (b && JSON.stringify(b))
}