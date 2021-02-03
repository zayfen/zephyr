// Copyright 2020 The Bottle Tech FE Authors.
//
// @create: 2020年 09月 02日 星期三 18:00:18 CST
// @author: zayfen<zhangyunfeng@shuame.com>

import {
  IVNode,
  ThemeNode
} from './prototype'


export class ThemeManager {
  private name: string = ''; // theme name
  private themeNodeList: Array<ThemeNode<IVNode>> = []

  constructor (name?: string) {
    this.name = name || ''
  }

  public registerThemeNode <T extends IVNode> (node: ThemeNode<T>) {
    let foundIndex = this.duplicatedThemeNode(node)
    if (foundIndex === -1) {
      this.themeNodeList.push(node)
      return
    }
    this.themeNodeList.splice(foundIndex, 1, node)
  }


  private duplicatedThemeNode <T extends IVNode> (node: ThemeNode<T>): number {
    let foundIndex = -1
    for (let i = 0; i < this.themeNodeList.length; i++) {
      let _node = this.themeNodeList[i]
      if (_node.tag === node.tag) {
        foundIndex = i
        break
      }
    }

    return foundIndex
  }

  public injectThemeNode <T extends IVNode> (node: T) {
    for (let i = 0; i < this.themeNodeList.length; i++) {
      if (this.themeNodeList[i].tag === node.tag) {
        node.themeNode = this.themeNodeList[i]
        // node.classList.splice(0, node.classList.length)
        node.themeNode.inject(node)
        node.theme = this
        return
      }
    }

    throw new Error('No Adapted ThemeNode: ' + node.tag)
  }

}
