import { encode } from '../string/base64'

export function hash<T>(obj: T): string {
  return encode(JSON.stringify(obj))
}