// UI 布局组件

import { LayoutNode, Node, TAGS } from './proptype';


// 横向布局
class Row extends LayoutNode implements Node {
  tag = TAGS.ROW;
  id = '';
  level = 0;
  style = '';
  classList = ['ui-row'];
  attrList = {};

  public render(node: Node): string {
    let dom = '';

    return dom;
  }
}
