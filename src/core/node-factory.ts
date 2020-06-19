import { TAGS, DefaultNode } from './prototype';


export class Page extends DefaultNode {
  constructor () {
    super(TAGS.PAGE)
  }
}

export class Row extends DefaultNode {
  constructor () {
    super(TAGS.ROW)
  }

  useFlex () {
    this.addAttr('__rowTypeFlex', true);
  }

  isRowTypeFlex (): boolean {
    return this.attr('__rowTypeFlex') || false;
  }

  childrenCenterOnMainAxis () {
    if (!this.isRowTypeFlex()) {
      return;
    }
    this.addAttr('__childrenCenterOnMainAxis', true);
  }

  isChildrenCenterOnMainAxis (): boolean {
    return this.attr('__childrenCenterOnMainAxis') || false;
  }

  childrenCenterOnCrossAxis () {
    if (!this.isRowTypeFlex()) {
      return;
    }
    this.addAttr('__childrenCenterOnCrossAxis', true);
  }

  isChildrenCenterOnCrossAxis (): boolean {
    return this.attr('__childrenCenterOnCrossAxis') || false;
  }
}

export class Col extends DefaultNode {
  constructor () {
    super(TAGS.COL)
  }

  setSpan (span: number) {
    this.addAttr('__span', span);
  }

  getSpan (): number {
    return this.attr('__span') || 24;
  }

  setGutter (gutter: number) {
    this.addAttr('__gutter', gutter);
  }

  getGutter (): number {
    return this.attr('__gutter') || 0;
  }
}

export class Card extends DefaultNode {
  constructor () {
    super(TAGS.CARD)
  }

  setTitle (title: string) {
    this.addAttr('__title', title);
  }

  getTitle (): string {
    return this.attr('__title', '');
  }
}

export class Image extends DefaultNode {
  constructor () {
    super(TAGS.IMAGE)
  }
  setSrc (src: string) {
    this.attrList.src = src;
  }
}

export class Button extends DefaultNode {
  constructor () {
    super(TAGS.BUTTON)
  }

  setButtonText (text: string) {
    this.addAttr('__buttonText', text);
  }

  getButtonText (): string {
    return this.attr('__buttonText', 'undefined');
  }
}

export class Text extends DefaultNode {
  constructor () {
    super(TAGS.TEXT)
  }

  setText (text: string) {
    this.addAttr('__text', text);
  }

  getText (): string {
    return this.attr('__text', '');
  }

  setFontSize (fontSize: number) {
    this.addStyle('fontSize', fontSize + 'px');
  }

  setFontWeight (weight: number) {
    this.addStyle('fontWeight', weight);
  }

  setFontColor (hexColor: string) {
    this.addStyle('color', hexColor);
  }

  setLineHeight (lineHeight: number) {
    this.addStyle('lineHeight', lineHeight);
  }
}
