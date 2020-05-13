// UI 布局组件

import { Layout, LayoutNode } from "../../core/proptype";
import { Page, Row, Col, Card, Button, Image, Text } from "../../core/node-factory";
import { TAGS } from "../../core/proptype";
import { StringBuilder } from "../../utils/string-utils";
import { resolveStyle, resolveClassList, resolveAttributes } from "../../utils/node-utils";



const kBasicLayout = new Layout();

export class PageLayout extends LayoutNode<Page> {
  tag = TAGS.PAGE;

  public render (node: Page): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${resolveAttributes(node)}>`);

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
export class RowLayout extends LayoutNode<Row> {
  tag = TAGS.ROW;
  public render (node: Row): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${resolveAttributes(node)}>`);

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
export class ColLayout extends LayoutNode<Col> {
  tag = TAGS.COL;

  public render (node: Col): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let classString = resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${resolveClassList(node)}" ${resolveAttributes(node)}>`);

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
export class CardLayout extends LayoutNode<Card> {
  tag = TAGS.CARD;
  public render (node: Card): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);

    sb.appendLine(`<div class="${classString}" style="${style}" ${resolveAttributes(node)}>`)
    let card: Card = node;
    if (card.getTitle()) { // 设置了title
      sb.appendLine(`<div class="ui-card__title"><span>${card.getTitle()}</span></div>`);
    }
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
export class ImageLayout extends LayoutNode<Image> {
  tag = TAGS.IMAGE;

  public render (node: Image): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    sb.appendLine(`<div class="${classString}" style="${style}" ${resolveAttributes(node)}>`);
    sb.appendLine(`  <img src="${node.attrList.src}"/>`);
    sb.appendLine(`</div>`);

    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new ImageLayout());


// 按钮
export class ButtonLayout extends LayoutNode<Button> {
  tag = TAGS.BUTTON;

  public render (node: Button): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);

    let button = node as Button;
    let buttonText = button.getButtonText();
    sb.appendLine(`<button class="${classString}" style="${style}"  ${resolveAttributes(node)}>`);
    sb.appendLine(`  <span>${node.attrList.buttonText}</span>`);
    sb.appendLine('</button>');
    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new ButtonLayout);

// 文字
export class TextLayout extends LayoutNode<Text> {
  tag = TAGS.TEXT;

  public render (node: Text): string {
    let sb = new StringBuilder();
    sb.setIndent(node.level * this.tabWidth);
    let style = resolveStyle(node);
    let classString = resolveClassList(node);
    let text = node.getText();
    sb.appendLine(`<div class="${classString}">`);
    sb.appendLine(`<span>${text}</span>`)
    sb.appendLine('</div>');

    return sb.str();
  }
}
kBasicLayout.registerLayoutNode(new TextLayout);

export const BasicHTMLLayout = kBasicLayout;
