import { TAGS, DefaultNode } from './proptype';


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

  setSpan (span: number) {
    this.attrList.span = span;
  }

  getSpan (): number {
    return this.attrList.span || 24;
  }

  setGutter (gutter: number) {
    this.attrList.gutter = gutter;
  }

  getGutter (): number {
    return this.attrList.gutter || 0;
  }
}

export class Card extends DefaultNode {
  tag = TAGS.CARD;
  id: string = 'col-card';

  setTitle (title: string) {
    this.addAttr('title', title);
  }

  getTitle (): string {
    return this.attrList.title || '';
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
    this.attrList.buttonText = text;
  }

  getButtonText (): string {
    return this.attrList.buttonText;
  }
}

export class Text extends DefaultNode {
  tag = TAGS.TEXT;
  id: string = 'text-id';

  setText (text: string) {
    this.addAttr('text', text);
  }

  getText (): string {
    return this.attr('text');
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
