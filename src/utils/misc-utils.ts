
export function randomKey (len: number): string {
  let leftLength = len
  let keys: string[] = []
  while (leftLength > 0) {
    let key = Math.random().toString(36).substr(2, leftLength)
    keys.push(key)
    // update leftLength
    leftLength -= key.length
  }
  return keys.join("")
}
