// theme about

import { Theme, ThemeNode, Node, TAGS } from './proptype';

const kBasicTheme = new Theme();

export class RowTheme extends ThemeNode {
  tag = TAGS.ROW;

  public inject (node: Node): Node {
    const kRowThemeClassList = ['ui-row'];
    kRowThemeClassList.forEach(cls => node.classList.indexOf(cls) > -1 ? void 0 : node.classList.push(cls));
    return node;
  }
}

kBasicTheme.registerThemeNode(new RowTheme());



const BasicTheme = kBasicTheme;

export { BasicTheme };
