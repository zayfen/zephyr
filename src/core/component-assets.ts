// 组件的定义

import { Clazz } from './types'
import {
  TAG_TYPE,
  VNode,
  LayoutNode,
  ThemeNode } from './prototype'

import { VNodeManager } from './vnode-manager'
import { LayoutManager } from './layout-manager'
import { ThemeManager } from './theme-manager'

type LayoutManagerMap = {
  [key: string]: LayoutManager
}

type ThemeManagerMap = {
  [key: string]: ThemeManager
}

export class ComponentAssets {
  private vnodeManager: VNodeManager = VNodeManager.getInstance()
  private layoutManagerMap: LayoutManagerMap = {}
  private themeManagerMap: ThemeManagerMap = {}

  constructor () {
    // do nothing here
  }

  public defineVNode (tag: TAG_TYPE, node: Clazz<VNode>) {
    this.vnodeManager.registerVNode(tag, node)
  }

  public defineLayoutNode (category: string, node: LayoutNode<VNode>) {
    let layoutManager = this.layoutManagerMap[category]
    if (!layoutManager) {
      layoutManager = this.layoutManagerMap[category] = new LayoutManager(category)
    }

    layoutManager.registerLayoutNode(node)
  }

  public defineThemeNode(category: string, node: ThemeNode<VNode>) {
    let themeManager = this.themeManagerMap[category]
    if (!themeManager) {
      themeManager = this.themeManagerMap[category] = new ThemeManager(category)
    }

    themeManager.registerThemeNode(node)
  }

  public findVNodeByTag (tag: TAG_TYPE): Clazz<VNode> {
    return this.vnodeManager.findVNodeByTag(tag)
  }

  public findLayoutManager (category: string): LayoutManager {
    const layoutManager = this.layoutManagerMap[category]
    if (!layoutManager) {
      throw new Error('No Specified LayoutManager Found! <' + category + '>')
    }
    return layoutManager
  }


  public findLayoutNode<T extends VNode> (category: string, node: T): LayoutNode<T> {
    const layoutManager = this.findLayoutManager(category)
    return layoutManager.findLayoutNode(node)
  }

  /**
  * 查找主题资源
  *@param { string } category 主题名
  *@returns { ThemeManager } 返回查找到的主题
  */
  public findThemeManager (category: string): ThemeManager {
    const themeManager = this.themeManagerMap[category]
    if (!themeManager) {
      throw new Error('No Specified ThemeManager Found! <' + category + '>')
    }

    return themeManager
  }

}
