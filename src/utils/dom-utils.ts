
/**
 * 通过html字符串创建dom对象
 * @param html html字符串
 */
export function createElementFromHTML (html: string): Node {
  let fragment = document.createElement('template')
  fragment.innerHTML = html.trim()
  return fragment.content.firstChild
}
