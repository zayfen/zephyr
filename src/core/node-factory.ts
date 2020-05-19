import { TAGS, DefaultNode } from './prototype';


export class Page extends DefaultNode {
  tag = TAGS.PAGE;
  id: string = 'page-id';
}

export class Row extends DefaultNode {
  tag = TAGS.ROW;
  id: string = 'row-id';

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
  tag = TAGS.COL;
  id: string = 'col-id';

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
    return this.attr('__span') || 0;
  }
}

export class Card extends DefaultNode {
  tag = TAGS.CARD;
  id: string = 'col-card';

  setTitle (title: string) {
    this.addAttr('__title', title);
  }

  getTitle (): string {
    return this.attr('__title', '');
  }
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
    this.addAttr('__buttonText', text);
  }

  getButtonText (): string {
    return this.attr('__buttonText', 'undefined');
  }
}

export class Text extends DefaultNode {
  tag = TAGS.TEXT;
  id: string = 'text-id';

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
