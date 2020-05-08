// UI 布局组件

import { Layout, LayoutNode, Node, TAGS, Utils } from './proptype';
import { StringBuilder } from '../utils/string_utils';
import { Image, Button } from './node_factory';

const kBasicLayout = new Layout();

export class PageLayout extends LayoutNode {
  tag = TAGS.PAGE;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine('</div>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new PageLayout);

// 横向布局
export class RowLayout extends LayoutNode {
  tag = TAGS.ROW;
  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine('</div>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new RowLayout());

// 列布局
export class ColLayout extends LayoutNode {
  tag = TAGS.COL;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${Utils.resolveClassList(node)}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine(`</div>`);

    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new ColLayout());

// 卡片布局
export class CardLayout extends LayoutNode {
  tag = TAGS.CARD;
  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);

    sb.appendLine(`<div class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`)
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }
    sb.appendLine('</div>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new CardLayout());


// 图像
export class ImageLayout extends LayoutNode {
  tag = TAGS.IMAGE;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);
    sb.appendLine(`  <img src="${node.attrList.src}">`);
    sb.appendLine(`  </img>`);
    sb.appendLine(`</div>`);

    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new ImageLayout());


// 按钮
export class ButtonLayout extends LayoutNode {
  tag = TAGS.BUTTON;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);

    let button = node as Button;
    let buttonText = button.getButtonText();
    sb.appendLine(`<button class="${classString}" style="${style}"  ${Utils.resolveAttributes(node)}>`);
    sb.appendLine(`  <span>${node.attrList.buttonText}</span>`);
    sb.appendLine('</button>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new ButtonLayout);

export const BasicLayout = kBasicLayout;
