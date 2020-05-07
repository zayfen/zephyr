// UI 布局组件

import { Layout, LayoutNode, Node, TAGS } from './proptype';
import { StringBuilder } from '../utils/string_builder';

const kBasicLayout = new Layout();

// 横向布局
class Row extends LayoutNode {
  tag = TAGS.ROW;
  public render(node: Node): string {
    let sb = new StringBuilder();
    let style = node.style;
    let classString = node.classList.reduce((prevValue, value) => prevValue + ' ' + value, '');
    classString = classString + ' ' + node.customClassList.reduce((prevValue, value) => prevValue + ' ' + value, '');

    sb.append(`<div class="${classString}" style="${style}">`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine('</div>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new Row());




const BasicLayout = kBasicLayout;
export { BasicLayout };
