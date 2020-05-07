// theme about

import { Theme, ThemeNode, Node, TAGS } from './proptype';

const kBasicTheme = new Theme();

export class PageTheme extends ThemeNode {
  tag = TAGS.PAGE;

  public inject (node: Node): Node {
    const kPageThemeClassList = ['ui-page'];
    kPageThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new PageTheme);

// 横向布局的样式主题
export class RowTheme extends ThemeNode {
  tag = TAGS.ROW;

  public inject (node: Node): Node {
    const kRowThemeClassList = ['ui-row'];
    kRowThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new RowTheme);

// 列布局
export class ColTheme extends ThemeNode {
  tag = TAGS.COL;

  public inject (node: Node): Node {
    const kColThemeClassList = ['ui-col'];
    kColThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ColTheme);


// 卡片布局
export class CardTheme extends ThemeNode {
  tag = TAGS.CARD;

  public inject (node: Node): Node {
    const kCardThemeClassList = ['ui-card'];
    kCardThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new CardTheme);

// 图像
export class ImageTheme extends ThemeNode {
  tag = TAGS.IMAGE;

  public inject (node: Node): Node {
    const kImageThemeClassList = ['ui-image'];
    kImageThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ImageTheme);

// 按钮
export class ButtonTheme extends ThemeNode {
  tag = TAGS.BUTTON;

  public inject (node: Node): Node {
    const kButtonThemeClassList = ['ui-button'];
    kButtonThemeClassList.forEach(cls => node.classList.push(cls));
    return node;
  }
}
kBasicTheme.registerThemeNode(new ButtonTheme);

export const BasicTheme = kBasicTheme;
