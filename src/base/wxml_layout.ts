// UI 布局组件

import { Layout, LayoutNode, Node, TAGS, Utils } from './proptype';
import { StringBuilder } from '../utils/string_utils';

const kBasicWXMLLayout = new Layout();

export class PageLayout extends LayoutNode {
  tag = TAGS.PAGE;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine('</view>');
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new PageLayout);

// 横向布局
export class RowLayout extends LayoutNode {
  tag = TAGS.ROW;
  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine('</view>');
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new RowLayout());

// 列布局
export class ColLayout extends LayoutNode {
  tag = TAGS.COL;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }

    sb.appendLine(`</view>`);

    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new ColLayout());

// 卡片布局
export class CardLayout extends LayoutNode {
  tag = TAGS.CARD;
  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);

    sb.appendLine(`<view class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`)
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        sb.appendLine(child.layoutNode.render(child));
      });
    }
    sb.appendLine('</view>');
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new CardLayout());


// 图像
export class ImageLayout extends LayoutNode {
  tag = TAGS.IMAGE;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);
    sb.appendLine(`  <image src="${node.attrList.src}"/>`);
    sb.appendLine(`</view>`);

    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new ImageLayout());


// 按钮
export class ButtonLayout extends LayoutNode {
  tag = TAGS.BUTTON;

  public render (node: Node): string {
    let sb = new StringBuilder();
    let style = Utils.resolveStyle(node);
    let classString = Utils.resolveClassList(node);

    sb.appendLine(`<button class="${classString}" style="${style}" ${Utils.resolveAttributes(node)}>`);
    sb.appendLine(`  <text>${node.attrList.buttonText}</text>`);
    sb.appendLine('</button>');
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new ButtonLayout);

export const BasicWXMLLayout = kBasicWXMLLayout;
