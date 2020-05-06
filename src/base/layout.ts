// UI 布局组件

import { LayoutNode, Node, TAGS } from './proptype';


// 横向布局
class Row extends LayoutNode {
  tag = TAGS.ROW;
  public render(node: Node): string {
    let dom = '';
    return dom;
  }
}
