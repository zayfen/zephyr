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


export class Col extends VNode {
  tag = TAGS.COL
  id: string = 'col-id'

  setSpan (span: number) {
    this.addAttr('__span', span)
  }

  getSpan (): number {
    return this.attr('__span') || 24
  }

  setGutter (gutter: number) {
    this.addAttr('__gutter', gutter)
  }

  getGutter (): number {
    return this.attr('__gutter') || 0
  }
}

export class ColHTML extends LayoutNode<Col> {
    render(node: Col): string {
        throw new Error("Method not implemented.")
    }

}

export class ColWXML extends LayoutNode<Col> {
    render(node: Col): string {
        throw new Error("Method not implemented.")
    }

}


export class ColTheme extends ThemeNode<Col> {
    inject(node: Col): Col {
        throw new Error("Method not implemented.")
    }

}
