// Copyright 2020 The Bottle Tech FE Authors.
//
// @create: 2020年 09月 02日 星期三 17:30:01 CST
// @author: zayfen<zhangyunfeng@shuame.com>

import {
  IVNode,
  TAG_TYPE,
  LayoutNode,
  SizeTranslator,
  TSizeTranslatorHolder
} from './prototype'

export class LayoutManager {
  private name: string = ''; // render name
  private layoutNodeList: Array<LayoutNode<IVNode>> = []
  private sizeTranslatorHolder: TSizeTranslatorHolder = { }

  constructor (name?: string) {
    this.name = name || ''
  }

  public specifySizeTranslator<T extends SizeTranslator> (translator: T): void {
    this.sizeTranslatorHolder.translator = translator
    this.layoutNodeList.forEach(node => node.sizeTranslatorHolder = this.sizeTranslatorHolder)
  }

  public registerLayoutNode <T extends IVNode> (node: LayoutNode<T>) {
    let foundIndex = this.duplicatedLayoutNode(node)
    node.setTranslatorHolder(this.sizeTranslatorHolder)

    if (foundIndex === -1) {
      this.layoutNodeList.push(node)
      return
    }
    console.warn('register a duplicated layout node: ', node.tag)
    this.layoutNodeList.splice(foundIndex, 1, node)
  }

  public injectLayoutNode <T extends IVNode> (node: T) {
    for (let i = 0; i < this.layoutNodeList.length; i++) {
      if (this.layoutNodeList[i].tag === node.tag) {
        node.layoutNode = this.layoutNodeList[i]
        node.layout = this
        return
      }
    }
    throw new Error('No Adapted LayoutNode: ' + node.tag)
  }

  public findLayoutNode <T extends IVNode> (node: T): LayoutNode<T> {
    let tag: TAG_TYPE = node.tag
    return this.findLayoutNodeByTag(tag)
  }

  public findLayoutNodeByTag (tag: TAG_TYPE): LayoutNode<IVNode> {
    for (let i = 0; i < this.layoutNodeList.length; i++) {
      if (this.layoutNodeList[i].tag === tag) {
        return this.layoutNodeList[i]
      }
    }
    throw new Error(`findLayoutNodeByTAg error: no layoutnode which tag is ${tag} found`)
  }

  private duplicatedLayoutNode<T extends IVNode> (node: LayoutNode<T>): number {
    let foundIndex = -1

    for (let i = 0; i < this.layoutNodeList.length; i++) {
      let _node = this.layoutNodeList[i]
      if (_node.tag === node.tag) {
        foundIndex = i
        break
      }
    }

    return foundIndex
  }

}
