// Copyright 2020 The Bottle Tech FE Authors.
//
// @Create: 2020年 09月 03日 星期四 10:47:58 CST

// @Author: zayfen<zhangyunfeng@shuame.com>

import {
  VNode,
  LayoutNode,
  ThemeNode,
  TAGS
} from '../core/prototype'


export class Row extends VNode {
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

export class RowHTML extends LayoutNode<Row> {
  render(node: Row): string {
    throw new Error("Method not implemented.")
  }

}

export class RowWXML extends LayoutNode<Row> {
  render(node: Row): string {
    throw new Error("Method not implemented.")
  }

}


export class RowTheme extends ThemeNode<Row> {
  inject(node: Row): Row {
    throw new Error("Method not implemented.")
  }
}
