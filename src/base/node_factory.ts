import { Node, TAGS, ThemeNode, LayoutNode } from './proptype';

class DefaultNode implements Node {
  tag = TAGS.NONE;
  id: string = '';
  level: Number = 0;
  style: string = '';
  customClassList: string[] = [];
  classList: string[] = [];
  attrList: { [key: string]: any; } = {};
  children: Node[] = [];
  themeNode: ThemeNode = null;
  layoutNode: LayoutNode = null;

  appendTo (node: Node): Node {
    node.children.push(this);
    return this;
  }
}

export class Page extends DefaultNode {
  tag = TAGS.PAGE;
  id: string = 'page-id';
}

export class Row extends DefaultNode {
  tag = TAGS.ROW;
  id: string = 'row-id';
}

export class Col extends DefaultNode {
  tag = TAGS.COL;
  id: string = 'col-id';
}

export class Card extends DefaultNode {
  tag = TAGS.CARD;
  id: string = 'col-card';
}

export class Image extends DefaultNode {
  tag = TAGS.IMAGE;
  id: string = 'image-id';

  setSrc (src: string) {
    this.attrList.src = src;
  }
}

export class Button extends DefaultNode {
  tag = TAGS.BUTTON;
  id: string = 'button-id';

  setButtonText (text: string) {
    this.attrList.buttonText = text;
  }

  getButtonText (): string {
    return this.attrList.buttonText;
  }
}
