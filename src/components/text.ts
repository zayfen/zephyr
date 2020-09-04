// Copyright 2020 The Bottle Tech FE Authors.
//
// @Create: 2020年 09月 03日 星期四 11:17:08 CST
// @Author: zayfen<zhangyunfeng@shuame.com>

import {
  VNode,
  LayoutNode,
  ThemeNode,
  TAGS
} from '../core/prototype'


export class Text extends VNode {
  tag = TAGS.TEXT;
  id: string = 'text-id';

  setText (text: string) {
    this.addAttr('__text', text);
  }

  getText (): string {
    return this.attr('__text', '');
  }

  setFontSize (fontSize: number) {
    this.addStyle('fontSize', fontSize + 'px')
  }

  setFontWeight (weight: number) {
    this.addStyle('fontWeight', weight)
  }

  setFontColor (hexColor: string) {
    this.addStyle('color', hexColor)
  }

  setLineHeight (lineHeight: number) {
    this.addStyle('lineHeight', lineHeight)
  }
}


export class TextHTML extends LayoutNode<Text> {
  render(node: Text): string {
    throw new Error("Method not implemented.");
  }
}


export class TextWXML extends LayoutNode<Text> {
  render(node: Text): string {
    throw new Error("Method not implemented.");
  }

}


export class TextTheme extends ThemeNode<Text> {
  inject(node: Text): Text {
    throw new Error("Method not implemented.");
  }
}
