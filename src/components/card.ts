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


export class Card extends VNode {
  tag = TAGS.CARD;
  id: string = 'col-card';

  setTitle (title: string) {
    this.addAttr('__title', title);
  }

  getTitle (): string {
    return this.attr('__title', '');
  }
}

export class CardHTML extends LayoutNode<Card> {
    render(node: Card): string {
        throw new Error("Method not implemented.");
    }

}

export class CardWXML extends LayoutNode<Card> {
    render(node: Card): string {
        throw new Error("Method not implemented.");
    }

}

export class CardTheme extends ThemeNode<Card> {
    inject(node: Card): Card {
        throw new Error("Method not implemented.");
    }

}
