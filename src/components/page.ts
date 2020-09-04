// Copyright 2020 The Bottle Tech FE Authors.
//
// @Create: 2020年 09月 02日 星期三 18:43:39 CST
// @Author: zayfen<zhangyunfeng@shuame.com>

import {
  TAGS,
  VNode,
  ThemeNode,
  LayoutNode
} from '../core/prototype'


export class Page extends VNode {
  tag = TAGS.PAGE;
  id: string = 'page-id';

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

// LayoutNode Page in HTML
export class PageHTML extends LayoutNode<Page> {
    render (node: Page): string {
        throw new Error("Method not implemented.");
    }

}


// LayoutNode Page in WXML
export class PageWXML extends LayoutNode<Page> {
    render (node: Page): string {
        throw new Error("Method not implemented.");
    }

}


export class PageTheme extends ThemeNode<Page> {
    inject(node: Page): Page {
        throw new Error("Method not implemented.");
    }

}
