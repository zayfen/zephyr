// theme about

import { Theme, Node, TAGS } from './proptype';


export class RowTheme extends Theme {
  tag = TAGS.ROW;

  public inject (node: Node): Node {
    const kRowThemeClassList = ['ui-row'];
    kRowThemeClassList.forEach(cls => node.classList.indexOf(cls) > -1 ? void 0 : node.classList.push(cls));
    return node;
  }
}
