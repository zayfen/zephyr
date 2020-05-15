import { Theme, ThemeNode } from "../../core/prototype";
import { Page, Row, Col, Card, Button, Image, Text } from "../../core/node-factory";
import { TAGS } from "../../core/prototype";
import { setStyle } from "../../utils/node-utils";

const kBasicTheme = new Theme();

export class PageTheme extends ThemeNode<Page> {
  tag = TAGS.PAGE;

  public inject (node: Page): Page {
    const kPageThemeClassList = ['ui-page'];
    kPageThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new PageTheme);

// 横向布局的样式主题
export class RowTheme extends ThemeNode<Row> {
  tag = TAGS.ROW;

  public inject (node: Row): Row {
    const kRowThemeClassList = ['ui-row'];
    kRowThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new RowTheme);

// 列布局
export class ColTheme extends ThemeNode<Col> {
  tag = TAGS.COL;

  public inject (node: Col): Col {
    const kColThemeClassList = ['ui-col'];
    let col: Col = node as Col;
    kColThemeClassList.push('ui-col-' + col.getSpan());
    let gutter = col.getGutter();
    setStyle(node, 'paddingLeft', `${gutter/2}px`);
    setStyle(node, 'paddingRight', `${gutter/2}px`);
    kColThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ColTheme);


// 卡片布局
export class CardTheme extends ThemeNode<Card> {
  tag = TAGS.CARD;

  public inject (node: Card): Card {
    const kCardThemeClassList = ['ui-card'];
    kCardThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new CardTheme);

// 图像
export class ImageTheme extends ThemeNode<Image> {
  tag = TAGS.IMAGE;

  public inject (node: Image): Image {
    const kImageThemeClassList = ['ui-image'];
    kImageThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ImageTheme);

// 按钮
export class ButtonTheme extends ThemeNode<Button> {
  tag = TAGS.BUTTON;

  public inject (node: Button): Button {
    const kButtonThemeClassList = ['ui-button'];
    kButtonThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ButtonTheme);

// 文字
export class TextTheme extends ThemeNode<Text> {
  tag = TAGS.TEXT;

  inject(node: Text): Text {
    const kTextThemeClassList = ['ui-text'];
    kTextThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }

}
kBasicTheme.registerThemeNode(new TextTheme);

export const BasicTheme = kBasicTheme;
