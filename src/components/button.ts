// Copyright 2020 The Bottle Tech FE Authors.
//
// @Create: 2020年 09月 02日 星期三 18:43:39 CST
// @Author: zayfen<zhangyunfeng@shuame.com>

import {
  VNode,
  LayoutNode,
  ThemeNode,
  TAGS
} from '../core/prototype'


export class Button extends VNode {
  tag = TAGS.BUTTON;
  id: string = 'button-id';

  setButtonText (text: string) {
    this.addAttr('__buttonText', text);
  }

  getButtonText (): string {
    return this.attr('__buttonText', 'undefined');
  }
}


export class ButtonHTML extends LayoutNode<Button> {
  render(node: Button): string {
    throw new Error("Method not implemented.");
  }

}


export class ButtonWXML extends LayoutNode<Button> {
  render(node: Button): string {
    throw new Error("Method not implemented.");
  }

}


export class ButtonTheme extends ThemeNode<Button> {
  inject(node: Button): Button {
    throw new Error("Method not implemented.");
  }

}
