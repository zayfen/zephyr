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


export class Image extends VNode {
  tag = TAGS.IMAGE;
  id: string = 'image-id';

  setSrc (src: string) {
    this.attrList.src = src;
  }
}


export class ImageHTMl extends LayoutNode<Image> {
    render(node: Image): string {
        throw new Error("Method not implemented.");
    }

}


export class ImageWXML extends LayoutNode<Image> {
    render(node: Image): string {
        throw new Error("Method not implemented.");
    }

}


export class ImageTheme extends ThemeNode<Image> {
    inject(node: Image): Image {
        throw new Error("Method not implemented.");
    }

}
