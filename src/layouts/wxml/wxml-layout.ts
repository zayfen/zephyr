// UI 布局组件

import { Layout, LayoutNode } from "../../core/proptype";
import { Page, Row, Col, Card, Button, Image, Text } from "../../core/node-factory";
import { TAGS } from "../../core/proptype";
import { StringBuilder } from "../../utils/string-utils";
import { resolveStyle, resolveClassList, resolveAttributes } from "../../utils/node-utils";


const kBasicWXMLLayout = new Layout();

export class PageLayout extends LayoutNode<Page> {
  tag = TAGS.PAGE;

  public render (node: Page): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${resolveAttributes(node)}>`);

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
export class RowLayout extends LayoutNode<Row> {
  tag = TAGS.ROW;
  public render (node: Row): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${resolveAttributes(node)}>`);

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
export class ColLayout extends LayoutNode<Col> {
  tag = TAGS.COL;

  public render (node: Col): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${resolveAttributes(node)}>`);

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
export class CardLayout extends LayoutNode<Card> {
  tag = TAGS.CARD;
  public render (node: Card): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);

    sb.appendLine(`<view class="${classString}" style="${style}" ${resolveAttributes(node)}>`)
    if (node.getTitle()) {
      sb.appendLine(`<text class="ui-card__title">${node.getTitle()}</text>`)
    }
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
export class ImageLayout extends LayoutNode<Image> {
  tag = TAGS.IMAGE;

  public render (node: Image): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<view class="${classString}" style="${style}" ${resolveAttributes(node)}>`);
    sb.appendLine(`  <image src="${node.attrList.src}"/>`);
    sb.appendLine(`</view>`);

    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new ImageLayout());


// 按钮
export class ButtonLayout extends LayoutNode<Button> {
  tag = TAGS.BUTTON;

  public render (node: Button): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);

    sb.appendLine(`<button class="${classString}" style="${style}" ${resolveAttributes(node)}>`);
    sb.appendLine(`  <text>${node.attrList.buttonText}</text>`);
    sb.appendLine('</button>');
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new ButtonLayout);

// 文字
export class TextLayout extends LayoutNode<Text> {
  tag = TAGS.TEXT;

  public render (node: Text): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<text class="${classString}" style="${style}" ${resolveAttributes(node)}>${node.getText()}</text>`);
    return sb.str();
  }
}
kBasicWXMLLayout.registerLayoutNode(new TextLayout);

export const BasicWXMLLayout = kBasicWXMLLayout;
